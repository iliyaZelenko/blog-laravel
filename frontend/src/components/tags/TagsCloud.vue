<template>
  <div>
    - Сделать кнопку которая регенерирует

    <div id="tag-cloud-wrapper">
    </div>

    <!--<canvas-->
    <!--ref="tagsCanvas"-->
    <!--width="960"-->
    <!--height="500"-->
    <!--style="border:1px solid #000000; width: 960px; height: 500px;"-->
    <!--/>-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import cloud from 'd3-cloud/build/d3.layout.cloud' 
import * as d3 from 'd3'
import Component from '~/plugins/nuxt-class-component'

@Component
export default class TagsCloud extends Vue {
  mounted () {
    const data = ['Hello', 'world', 'normally', 'you', 'want', 'more', 'words', 'than', 'this', 'qualify',
      'mix', 'timetable', 'amber', 'lonely', 'continental', 'merit', 'gas', 'sympathetic', 'extreme', 'latest',
      'major', 'cucumber', 'draft', 'Venus', 'conception', 'shatter', 'decade',
      'wood', 'constitution', 'fresh', 'watch', 'accountant', 'integrated', 'mountain', 'prevalence', 'choose',
      'white', 'news', 'apology', 'overlook', 'plug', 'quit'
    ]
      .map(i => ({
        text: i,
        size: 5 + Math.random() * 30 + (Math.random() * 50 > 40 ? 50 : 0)
      }))

    let w = 1024; let h = 512
    let maxFont = 96
    let maxSize = data[0].size || 1
    let sizeOffset = maxFont / maxSize
    let fill = d3.scale.category20b()
    cloud()
      .size([w, h])
      .words(data)
      .spiral('rectangular')
      .padding(6)
      .rotate(function () { return (~~(Math.random() * 2) * -30) || 60 })
    // .text(function (d) { return d.text; })
      .font('Impact')
      .fontSize(function (d) {
        return Math.max(20, Math.min(d.size * sizeOffset, maxFont))
      })
      .on('end', onDraw)
      .start()

    // callback fired when all words have been placed
    function onDraw () {
      let svg = d3.select('#tag-cloud-wrapper').append('svg').attr({ width: w, height: h, 'id': 'svg-node' })

      let vis = svg.append('g').attr('transform', 'translate(' + [w >> 1, (h >> 1) - 10] + ')scale(2)')
      let text = vis.selectAll('text').data(data)
      text.enter().append('text')
        .style('font-family', function (d) { return d.font })
        .style('font-size', function (d) { return d.size + 'px' })
        .style('fill', function (d, i) { return fill(i) })
        .style({ cursor: 'pointer', opacity: 1e-6 })
        .attr('text-anchor', 'middle')
        .attr('transform', function (d) {
          return 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')'
        })
        .text(function (d) { return d.text })
        .on('mouseover', function (d) {
          d3.select(this)
            .transition()
            .duration(500)
            .style('opacity', 0.8)
            .style('font-size', function (d) {
              return d.size + 5 + 'px'
            })
        })
        .on('mouseout', function () {
          d3.select(this)
            .transition()
            .duration(200)
            .style('opacity', 1)
            .style('font-size', function (d) {
              return d.size - 5 + 'px'
            })
        })
        .on('click', function (d) {
          // [this] is the <text> element of svg
          // let show = !this.classList.contains('current')
          // toogleFade.apply(this, [show, d])
          alert('Tag: ' + d.text)
        })
      // .on('click', function (d) {
        //   // [this] is the <text> element of svg
        //   let show = !this.classList.contains('current')
        //   toogleFade.apply(this, [show, d])
        // })
        .transition()
        .duration(1000)
        .style('opacity', 1)
      vis.transition()
        .delay(450)
        .duration(750)
        .attr('transform', 'translate(' + [w >> 1, (h >> 1) + 10] + ')scale(1)')
    }// end onDraw

    // determines wheter to show or hide the elements in svg
    // function toogleFade (show, d) {
    //   let element = d3.select(this)
    //   let svg = d3.select('#svg-node')
    //   let time1 = 700
    //   let time2 = 1000
    //   show = !!show
    //   element.attr({ 'class': show ? 'current' : null, 'data-role': 'animation' })
    //     .transition()
    //     .duration(time1)
    //     .attr('transform', 'translate(' + [d.x, d.y] + ')rotate(' + (show ? 0 : d.rotate) + ')scale(' + (+!show || 3) + ')')
    //     .each('end', function () {
    //       show && setTimeout(function () {
    //         // alert('tag: ' + d.text)
    //       }, time2 - time1)
    //     })
    //   svg.selectAll("text:not([data-role='animation'])")
    //     .transition()
    //     .duration(time2)
    //     .style('opacity', +!show)
    //     .style('visibility', show ? 'hidden' : 'visible')
    //     .each('end', function () { element.attr('data-role', null) })
    // }// end toogleFade

    // cloud().size([960, 500])
    //   // .canvas(function () { return new Canvas(1, 1) })
    //   .canvas(this.$refs.tagsCanvas)
    //   .words(words)
    //   .padding(5)
    //   .rotate(function () { return ~~(Math.random() * 2) * 90 })
    //   // .font('Impact')
    //   .fontSize(function (d) { return d.size })
    //   .on('end', end)
    //   .start()
    //
    // function end (words) {
    //   // console.log(JSON.stringify(words))
    // }
  }
}
</script>

<style>
  .legend {
    border: 1px solid #555555;
    border-radius: 5px 5px 5px 5px;
    font-size: 0.8em;
    margin: 10px;
    padding: 8px;
  }

  .bld {
    font-weight: bold;
  }

  #tag-cloud-wrapper {
    margin: 0 auto;
    width: fit-content;
  }

  #tag-cloud-wrapper > * {
    border-radius: 13px;
    /*background: radial-gradient(ellipse at center,  rgba(82,84,163,0.2) 0%,rgba(0,0,0,0) 100%);*/
  }
</style>
