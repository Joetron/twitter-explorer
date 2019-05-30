
const convert = data => {
    const { statusesDb, searchTerms } = data;

    const groups = Object.keys(searchTerms);

    const timelineDataDict = {};

    let max = -Infinity;
    let min =  Infinity;

    // Include parent for retweets and replies
    const includeDerivedParent = false;

    groups.forEach(group => {
        // extract tweets from db
        const tweets = searchTerms[group].map(id => statusesDb[id]);

        timelineDataDict[group] = {};
        const timelineData = timelineDataDict[group];

        // add the main content data
        tweets.forEach(tweet => {
            // retweets do not go in here
            if (!(tweet.retweeted_status && tweet.retweeted_status.id_str)) {
                timelineData[tweet.id_str] = {
                    parent: { id: tweet.id_str, date: tweet.created_at },
                    group
                };

                const timestamp = +new Date(tweet.created_at);
                if(timestamp > max) {
                    max = timestamp
                }

                if(timestamp < min) {
                    min = timestamp;
                }

                const d = timelineData[tweet.id_str];
                if(d.parent.id === "1130950472809033728") {
                    console.log(d)
                }
            }
        });

        tweets.forEach(tweet => {
            // add retweets
            if(tweet.retweeted_status && tweet.retweeted_status.id_str) {
                let data = timelineData[tweet.retweeted_status.id_str] || {
                    parent: { id: tweet.retweeted_status.id_str, date: tweet.retweeted_status.created_at, connectable: includeDerivedParent }
                };

                if (!data.retweets) {
                    data.retweets = [];
                }

                const timestamp1 = +new Date(tweet.created_at);
                const timestamp2 = +new Date(tweet.retweeted_status.created_at);

                if(timestamp1 > max) {
                    max = timestamp1;
                }

                if (!includeDerivedParent) {
                    if (timestamp1 < min) {
                        min = timestamp1;
                    }
                } else {
                    if (timestamp2 < min) {
                        min = timestamp2;
                    }
                }

                data.retweets.push({ id: tweet.id_str, date: tweet.created_at });

                timelineData[tweet.retweeted_status.id_str] = data;
                if(data.parent.id === "1130950472809033728") {
                    console.log({...data})
                }
            // add replies, TODO: let's look at this again
            } else if (tweet.in_reply_to_status_id_str) {
                const timestamp = +new Date(tweet.created_at);

                let data = timelineData[tweet.in_reply_to_status_id_str] || {
                    // TODO: fetch these!!
                    parent: { id: tweet.in_reply_to_status_id_str, date: tweet.created_at, connectable: includeDerivedParent }
                };

                // in case we did not have the original tweet, set the date to earliest reply
                if(data.parent.date < timestamp) {
                    data.parent.date = timestamp;
                }

                if (!data.replies) {
                    data.replies = [];
                }
                
                if(timestamp > max) {
                    max = timestamp;
                }

                if(timestamp < min) {
                    min = timestamp;
                }

                data.replies.push({ id: tweet.id_str, date: tweet.created_at });

                timelineData[tweet.in_reply_to_status_id_str] = data;

                if(data.parent.id === "1130950472809033728") {
                    console.log({...data})
                }
            }
        });
    });

    const groupData = {};
    for (let group in timelineDataDict) {
        const timelineData = timelineDataDict[group];
        groupData[group] = Object.keys(timelineData).map(key => timelineData[key]);

        const data = groupData[group];

        data.forEach(d => {
            const { parent, retweets, replies } = d;
            let max = includeDerivedParent && parent.date ? +new Date(parent.date) : -Infinity;
            let min = includeDerivedParent && parent.date ? max : Infinity;
            
            const setMinMax = date => {
                const ts = +new Date(date);

                if (ts > max) {
                    max = ts; // TODO: if max = min, max += barheight - 1 (use xscale?)
                }

                if (ts < min) {
                    min = ts;
                }
            };

            if (retweets) {
                retweets.forEach(({ date }) => setMinMax(date));
            } else if (replies) {
                replies.forEach(({ date }) => setMinMax(date));
            } else {
                setMinMax(parent.date);
            }

            if (retweets) {
                retweets.forEach(({ date }) => setMinMax(date));
                retweets.sort((rt1, rt2) => rt1.date - rt2.date);
            }

            if (replies) {
                replies.forEach(({ date }) => setMinMax(date));
                replies.sort((rp1, rp2) => rp1.date - rp2.date);
            }

            d.range = {
                min, max,
                minDate: new Date(min),
                maxDate: new Date(max)
            };
        });

        data.sort(({ range: r1 }, { range: r2 } ) => {
            const dif = r1.min - r2.min;

            return dif === 0 ? r1.max - r2.max : dif; 
        });
    }

    return {
        // TODO: change min/max to start/end
        min, max,
        data: groupData,
        minDate: new Date(min),
        maxDate: new Date(max)
    };
};

export default convert;