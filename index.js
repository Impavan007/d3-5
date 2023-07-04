let k_url1="https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";
let m_url2="https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let v_url3="https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let movieData;

let canvas=d3.select("#canvas");
let tooltip=d3.select("#tooltip");


let drawMap=()=>{
    let hierarchy= d3.hierarchy(movieData,(node)=>{
        return node['children']
    }).sum((node)=>{
        return node['value']
    }).sort((node1,node2)=>{
        return node2['value']-node1['value']
    })
    let createTreeMap=d3.treemap()
    .size([1000,600]) 
    
    createTreeMap(hierarchy);
   let movies=hierarchy.leaves()
   console.log(movies)
   
  let block= canvas.selectAll("g")
   .data(movies)
   .enter()
   .append("g")
   .attr("transform",(item)=>{
    return 'translate('+item['x0']+', '+item['y0']+')'
   })
   
   block.append('rect')
   .attr("class","tile")
   .attr("fill",(item)=>{
    let category=item['data']['category']
    if(category==='Action'){
        return "Orange";
    } else if(category==='Drama'){
        return "lightGreen";
    }
    else if(category==='Adventure'){
        return "coral";
    }
    else if(category==='Family'){
        return "lightblue";
    }
    else if(category==='Animation'){
        return "pink";
    }
    else if(category==='Comedy'){
        return "khaki";
    } 
    else if(category==='Biography'){
        return "tan";
    }
   })
   .attr("data-name",(item)=>{
    return item['data']['name']
   })
   .attr("data-category",(item)=>{
    return item['data']['category']
   })
   .attr("data-value",(item)=>{
    return item['data']['value']
   })
 .attr("width",(item)=>{
    return item['x1']-item['x0']
 })
 .attr("height",(item)=>{
    return item['y1']-item['y0']
 })
 .on("mouseover",(item)=>{
    tooltip.transition()
    .style("visibility","visible")
    let revenue=item['data']['value'].toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
    tooltip.html(
        item['data']['name']+ '<br/>' +"revenue" + ':'+'$'+revenue+'<hr/>'

    )
    .attr("data-value",item['data']['value'])
 })
 .on("mouseout",(item)=>{
    tooltip.transition()
    .style("visibility","hidden")
 })
 
    block.append('text')
    .text((item)=>{
        return item['data']['name']
    })
    .attr('x',5)
    .attr('y',20)
   
}

d3.json(m_url2).then(
    (data,error)=>{
        if(error){
            console.log(error)
        }else{
            movieData=data
            drawMap();
        }
    }
)