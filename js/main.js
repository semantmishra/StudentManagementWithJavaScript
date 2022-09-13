// function openModal(){

// 	var add_btn = document.getElementById("add-list-btn");
// 	add_btn.onclick = function(){
// 	$("#add-list").modal();
// 	}
// }
// openModal();

function saveList(){
	let save_btn = document.getElementById("save-list-btn");
	
	save_btn.onclick =function(){
		let list_type = document.getElementById("list-type").value;
		let desc = document.getElementById("description").value;
		let data = [];
		if(localStorage.getItem("list_"+list_type)!=null){
	   				
						data = JSON.parse(localStorage.getItem("list_"+list_type));
						data.push(desc);
						localStorage.setItem("list_"+list_type,JSON.stringify(data));
						showList();
						if(localStorage.getItem("list_"+list_type)!=null){
						$(".image-notice").removeClass("d-none");
						setTimeout(function(){$(".image-notice").addClass("d-none");},3000);
						document.getElementById("description").value = "";
						}	

			}	
			else{

				data.push(desc);
				localStorage.setItem("list_"+list_type,JSON.stringify(data));
				if(localStorage.getItem("list_"+list_type)!=null){
				$(".image-notice").removeClass("d-none");
				setTimeout(function(){$(".image-notice").addClass("d-none");},2000);
				document.getElementById("description").value = "";
			}	
		}
		

	}
}
saveList();


function getListByOnchage(){

let list_type = document.getElementById("list-type");
	list_type.onchange = function(){
		showList()
	}
}
getListByOnchage();

function showList(){
	let list = document.getElementById("list-type").value;
	for (var i = 0; i < localStorage.length; i++) {
			let key = localStorage.key(i);
			if(key.indexOf(list)!=-1)
			{
				let data = JSON.parse(localStorage.getItem("list_"+list));
				document.getElementById("list-data").innerHTML = "";
				data.forEach(function(d){
					let li = document.createElement("LI");
					li.className = "list-group-item";
					li.innerHTML = d;

					document.getElementById("list-data").append(li);
				});

			}
		}

}
showList();


function saveCourse(){
	let save_btn = document.getElementById("save-course-btn");
	
	save_btn.onclick =function(){
		let list_type = document.getElementById("list-type").value;
		let course_name	= document.getElementById("course_name");
		let course_fee = document.getElementById("course_fee");
		let data = [];
		let course = {
			course_name:course_name.value,
			course_fee:course_fee.value
		}
		if(localStorage.getItem("list_course")!=null){
	   				
						data = JSON.parse(localStorage.getItem("list_course"));
						data.push(course);
						localStorage.setItem("list_course",JSON.stringify(data));
						showList();
						if(localStorage.getItem("list_course")!=null){
						$(".course_notice").removeClass("d-none");
						setTimeout(function(){$(".course_notice").addClass("d-none");},3000);
						course_name.value = "";
						course_fee.value = "";
						showCourse();
						}	

			}	
			else{
				data.push(course);
				localStorage.setItem("list_course",JSON.stringify(data));
				if(localStorage.getItem("list_course")!=null){
				$(".course_notice").removeClass("d-none");
				setTimeout(function(){$(".course_notice").addClass("d-none");},2000);
				course_name.value = "";
				course_fee.value = "";
				showCourse();
			}	
		}
		

	}
}
saveCourse();

function showCourse(){

	let course = JSON.parse(localStorage.getItem("list_course"));
	let contener = document.getElementById("show-course");
	if(course!=null)
	{
		let html = `<table class="table">
				    <thead class="bg-danger text-white">
				      <tr>
				        <th>Course</th>
				        <th>Fee</th>
				      </tr>
				    </thead>
				    <tbody id="show-course-data">
				      
				    </tbody>
				  </table>`;
				contener.innerHTML = html;
		document.getElementById("show-course-data").innerHTML = "";
		course.forEach(function(data){
			let tr = document.createElement("TR");
			
			let td_c = document.createElement("TD");
			let td_f = document.createElement("TD");
				td_c.innerHTML = data.course_name;
				td_f.innerHTML = data.course_fee;
				tr.append(td_c);
				tr.append(td_f);
			document.getElementById("show-course-data").append(tr);
		});	
		

	}else{
		let p = `<br><p class=" text-danger font-weight-bold course_show_notice ">Please Create Course</p>`;
		contener.innerHTML = p;
	}
}

showCourse();
