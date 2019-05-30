import React, { PureComponent } from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

// TODO: config
const width = 420;
const rowHeight = 20;
const xAxisHeight = rowHeight;
const midRowHeight = rowHeight / 2;
const barHeight = rowHeight;
const halfBarHeight = barHeight / 2;
const arrowWidth = halfBarHeight;
const arrowWidthBoth = halfBarHeight * 2;
const rowSpacing = 2;
const groupSpacing = 4;

const circlePathData = x => `
    M ${x}, ${halfBarHeight}
    a ${halfBarHeight},${halfBarHeight} 0 1,1 ${barHeight},0
    a ${halfBarHeight},${halfBarHeight} 0 1,1 -${barHeight},0
`;

const barPathData = (barWidth, x) => {
    let width = barWidth - arrowWidthBoth;
    width = width < 0 ? 0 : width;

    //    2          3
    //    ------------
    //   -            -
    //1 -              - 4
    //   -            -
    //    ------------
    //    6          5

    return `
        M${x} ${halfBarHeight}
        L${x + arrowWidth} 0
        L${x + width + arrowWidth} 0
        L${x + width + arrowWidthBoth} ${halfBarHeight}
        L${x + width + arrowWidth} ${barHeight}
        L${x + arrowWidth} ${barHeight} Z
    `;
}

class Timeline extends PureComponent {
    constructor(props) {
        super(props);
        this.targetRef = React.createRef();
    }

    componentDidMount() {
        this.initChart();
        this.initAxis();
    }

    initChart = () => {
        this.chart = d3.select(this.targetRef.current)
            .attr("width", width + rowHeight);

        this.timeline = this.chart.append("svg").attr("y", xAxisHeight);
        this.transition = d3.transition().duration(500);
    }

    initAxis = () => {
        this.x = d3.scaleTime();
        this.axis = d3.axisTop();

        this.x.domain([0, 0]).range([0, width]);
        this.axis.scale(this.x);

        this.chart.append("g")
            .attr("width", width)
            .attr("height", xAxisHeight)
            .attr("class", "x axis")
            .attr("transform", `translate(${0}, ${xAxisHeight})`)
            .call(this.axis);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.updated !== this.props.updated) {
            this.renderTimeline();
        }
    }

    compactRows = (groupData, x, minWidth) => {
        const midWidth = minWidth / 2;

        const setDataD3 = (d, { minDate, maxDate, min, max }) => {
            let width = x(maxDate) - x(minDate);
            const isCircle = min === max;
            const adjustWidth = width < minWidth;

            d.width = isCircle || adjustWidth ? minWidth : width;
            d.x = x(minDate) - (isCircle || adjustWidth ? midWidth : 0);
            d.isCircle = isCircle;
        };

        const fillAfter = (firstDatum, i, data, row) => {
            let end = firstDatum.x + firstDatum.width;

            for (let j = i; j < data.length; j++) {
                const datum = data[j];
                const start = datum.x;

                if (!datum.visited && start > end) {
                    datum.row = row;
                    datum.visited = true;
                    end = start + datum.width;
                }
            }
        };

        let d3Data = [];
        const data2d = [];
        let yOffset = 0;

        for (let group in groupData) {
            const data = groupData[group];
            let row = 0;

            data.forEach(datum => setDataD3(datum, datum.range));
    
            // TODO: fix warning
            // eslint-disable-next-line
            data.forEach((datum, i) => {
                if (!datum.visited) {
                    datum.row = row;
                    datum.visited = true;
                    fillAfter(datum, i, data, row, yOffset);
                    row++;
                }
            });
            
            d3Data = d3Data.concat(data);
            data2d.push({ group, yOffset, data, rows: row });
            yOffset += row;
        }

        return { data: d3Data, totalRows: yOffset, d3Data: data2d };
    }

    updateAxis = (minDate, maxDate) => {
        // set an initial scale
        this.x.domain([minDate, maxDate]).range([0, width]);
        // adjust scale with padding so the centered circles fit 
        const startWithPadding = this.x.invert(-midRowHeight);
        const endWithPadding = this.x.invert(width + midRowHeight);
        this.x.domain([startWithPadding, endWithPadding]).range([0, width]);
        this.axis.scale(this.x);
        
        this.chart.select(".x")
            .transition(this.transition)
            .call(this.axis);
    }

    renderTimeline = () => {
        const { data: timelineData, minDate, maxDate } = this.props.timelineData || {};

        this.updateAxis(minDate, maxDate);
        const { totalRows, d3Data } = this.compactRows(timelineData, this.x, barHeight);
    
        const chartHeight = (rowHeight + rowSpacing) * totalRows + xAxisHeight;
        const chartPadding = d3Data.length * groupSpacing * 2 + groupSpacing;
        this.chart.attr("height", chartHeight + chartPadding);
        
        // ############# bar groups ############
        const barGroupUpdate = this.timeline.selectAll(".barGroup").data(d3Data);
        barGroupUpdate.exit().remove();
        
        const barGroupEnter = barGroupUpdate
            .enter().append("g")
            .attr("class", "barGroup");

        const barGroupEnterUpdate = barGroupEnter.merge(barGroupUpdate);
        barGroupEnterUpdate.attr("transform", (d, i) => `translate(${0}, ${d.yOffset * (rowHeight + rowSpacing) + i * groupSpacing + groupSpacing/2})`);
        // #####################################
        // ############# separator #############
        const separatorEnter = barGroupEnter.append("line")
            .attr("class", "separator");

        const separatorUpdate = barGroupEnterUpdate.select(".separator")
            .attr("opacity", (_, i) => i === d3Data.length - 1 ? 0 : 1)
            .attr("x1", 0)
            .attr("x2", width)
            .attr("y1", d => d.rows * (rowHeight + rowSpacing) + groupSpacing/2)
            .attr("y2", d => d.rows * (rowHeight + rowSpacing) + groupSpacing/2)
            .attr("stroke", "black");

        separatorUpdate.exit().remove();    
        separatorEnter.merge(separatorUpdate);
        // #####################################
        // ########### timeline bars ###########
        const barUpdate = barGroupEnterUpdate.selectAll(".bar").data(d => d.data);
        barUpdate.exit().remove();
            
        const barEnter = barUpdate
            .enter().append("g")
            .attr("class", "bar");

        barEnter.append("path");
        const barEnterUpdate = barEnter.merge(barUpdate);

        barEnterUpdate.attr("transform", d => `translate(${0}, ${(d.row) * (rowHeight + rowSpacing) + rowSpacing/2})`);
        barEnterUpdate.select("path")
            .attr("width", d => d.width)
            .attr("d", d => d.isCircle ? circlePathData(d.x) : barPathData(d.width, d.x))
            .attr("fill", d => (d.retweets ? "#F00" : (d.replies ? "#00F" : "#0F0")))
            .attr("x", d => d.x)
            .attr("rx", d => d.rx)
            .attr("height", barHeight);
        // #####################################
        
        // barEnterUpdate.select("text")
        //     .attr("x", function(d) { return x(d.value) - 3; })
        //     .attr("y", rowHeight / 2)
        //     .attr("dy", ".35em")
        //     .text(function(d) { return d.value; });
    }

    render() {
        return (
            <svg ref={this.targetRef} />
        );
    }
}

const mapStateToProps = state => state.tweets;

export default connect(
	mapStateToProps
)(Timeline);