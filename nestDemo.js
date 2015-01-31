/*
csvfile:
TYPE  
  a  
  b  
  c  
  a  
  d  
  b */ 



d3.csv("resources/ff.csv",function(error,csv){
           var TypeName=[{}];

           var nest=d3.nest()
		     .key(function(d){return d.TYPE;})
		     .entries(csv);

           for(var i=0;i<nest.length;i++)
		   { 
			   TypeName[i]={"name":nest[i].key,"size":nest[i].values.length};     
		   }
          var root = {"name":"root", "children":[{}]};

	      TypeName.forEach(function(d){
		    if(typeof root.children[d.name] !== 'undefined') {
				root.children[d.name].children.push(d);
			 
				} else {	
					root.children[d.name] = {"name": d.name, "children": [d]};
				 }
			});
		root.children= Object.keys(root.children).map(function (key) { return root.children[key]; });

 <pre name="code" class="plain">    div.selectAll(".node")
      .data(treemap.nodes(root))//计算树形布局和返回节点的数组。
       .enter().append("div")
      .attr("class", "node")
      .style("left", function(d) { return d.x + "px"; })
      .style("top", function(d) { return d.y + "px"; })
      .style("width", function(d) { return Math.max(0, d.dx - 1) + "px"; })
      .style("height", function(d) { return Math.max(0, d.dy - 1) + "px"; })
      
      .style("background", function(d) { //只为有孩子的节点赋值，也就是说叶子节点的背景颜色都是他爸爸的颜色
      	return d.children ? color(d.name) : null; 
      })
      .text(function(d) { //同理，孩子设置文字，爸爸没有
      	return d.children ? null : d.name; 
      });
});



//JSON串读取

d3.json("path/1.json",function(error,json){
       console.log(json);
});