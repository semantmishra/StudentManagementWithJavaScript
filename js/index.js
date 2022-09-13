function ope(){
		// $(".utility-con").addClass("d-none");
		let dl = document.getElementById('add');
		dl.style.display="block";
		dl.className="animate__animated animate__zoomIn animate__faster border shadow-sm";
		document.getElementById("student-id").innerHTML = getMaxStudentId();
		document.getElementById("o").value = "i";

	}
function getMaxStudentId(){
		let max = 0;
			for (var i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
				
				if(key.indexOf("student")!=-1)
				{
					let id =Number(key.split("_")[1]);
					if(max<id)
					{
						max = id;
					}
				}
			}
			return max+1;
	}
	function cl(){
		let dl = document.getElementById('add');
		dl.className="animate__animated animate__zoomOut animate__faster";
		setTimeout(function(){dl.style.display="none";},100);
		$("#student-form").trigger("reset");
		document.getElementById('upload-pic').src = "images/upload_pic.png";
	}

	function uploadImage(){

		let photo = document.getElementById('photo');
		
		photo.onchange = function(){
			
			let file = photo.files[0];
			let size = file.size;
			
			if(size<204800) //200 kb
			{
				let url = URL.createObjectURL(file);
				$(".upload-pic").attr("src",url);
			}else{
				$(".upload-pic").attr("src","images/upload_pic.png");
				photo.value = "";

				$(".image-notice").removeClass("d-none");
				setTimeout(function(){$(".image-notice").addClass("d-none");},2000);
				
			}
			
		}
	}
	uploadImage();

	function saveStudent(){
		let save_btn = document.getElementById("save-student-btn");
		save_btn.onclick = function(){
			
			let student_id = document.getElementById("student-id").innerHTML.trim();
			let name = document.getElementById("s-name");
			let fatherName = document.getElementById("f-name");
			let mother_name = document.getElementById("m-name");
			let dob = document.getElementById("dob");
			let gender = document.getElementById("gender");
			let doa = document.getElementById("doa");
			let course = document.getElementById("course");
			let total_fee = document.getElementById("total-fee");
			let session = document.getElementById("session");
			let mobile_one = document.getElementById("mobile-one");
			let mobile_two = document.getElementById("mobile-two");
			let email = document.getElementById("email");
			let district = document.getElementById("district");
			let pincode = document.getElementById("pincode");
			let address = document.getElementById("address");
			let op = document.getElementById("o");
			let photo = document.getElementById('photo');
			let reader = new FileReader();
			
			let form = document.getElementById('student-form');
			let input = form.getElementsByTagName('INPUT');
			for (var i = 0; i < input.length; i++) {
				if(input[i].value=="")
				{	if(input[i].type=="file")
					{
						input[i].click();
						return false;
					}
						input[i].focus();
						return false;
				}
			}

			// if(name.value=="")
			// {
			// 	name.focus();
			// }else if(fatherName=="")
			// {
			// 	fatherName.focus();
			// }
			// else if(fatherName=="")
			// {
			// 	fatherName.focus();
			// }
			if(	op == "u")
			{

				if(photo.value=="")
				{
					let student = JSON.parse(localStorage.getItem("student_"+student_id));
					student = {
					student_id:student_id,
					name:name.value,
					image:student.image,
					fatherName:fatherName.value,
					mother_name:mother_name.value,
					dob:dob.value,
					gender:gender.value,
					doa:doa.value,
					course:course.value,
					total_fee:total_fee.value,
					session:session.value,
					mobile_one:mobile_one.value,
					mobile_two:mobile_two.value,
					email:email.value,
					district:district.value,
					pincode:pincode.value,
					address:address.value,
					fee:[]
				}

				localStorage.setItem("student_"+student_id,JSON.stringify(student));
				if(localStorage.getItem("student_"+student_id)!=null)
				{
					showStudent();
					alert("done");
					document.getElementById("student-id").innerHTML = getMaxStudentId();
				}

				}else{
					reader.readAsDataURL(photo.files[0]);
				reader.onload = function(){
				let image = this.result;
				
				let student = {

					student_id:student_id,
					name:name.value,
					image:image,
					fatherName:fatherName.value,
					mother_name:mother_name.value,
					dob:dob.value,
					gender:gender.value,
					doa:doa.value,
					course:course.value,
					total_fee:total_fee.value,
					session:session.value,
					mobile_one:mobile_one.value,
					mobile_two:mobile_two.value,
					email:email.value,
					district:district.value,
					pincode:pincode.value,
					address:address.value,
					fee:[]
				}

				localStorage.setItem("student_"+student_id,JSON.stringify(student));
					if(localStorage.getItem("student_"+student_id)!=null)
					{
						showStudent();
						alert("done with image");
						document.getElementById("student-id").innerHTML = getMaxStudentId();
					}	

				}
				}			
			}
				else{
				reader.readAsDataURL(photo.files[0]);
				reader.onload = function(){
				let image = this.result;
				
				let student = {

					student_id:student_id,
					name:name.value,
					image:image,
					fatherName:fatherName.value,
					mother_name:mother_name.value,
					dob:dob.value,
					gender:gender.value,
					doa:doa.value,
					course:course.value,
					total_fee:total_fee.value,
					session:session.value,
					mobile_one:mobile_one.value,
					mobile_two:mobile_two.value,
					email:email.value,
					district:district.value,
					pincode:pincode.value,
					address:address.value,
					fee:[]
				}

				localStorage.setItem("student_"+student_id,JSON.stringify(student));
				if(localStorage.getItem("student_"+student_id)!=null)
				{

					cl();
					showStudent();
				}	
			}
			}
			

		}
	}

saveStudent();

function showStudent(){
	let table = `<table class="table w-100">
			    <thead class="text-center bg-danger text-white">
			      <tr>
			      	<th>Photo</th>
			      	<th>ID</th>
			        <th>Name</th>
			        <th>F-Name</th>
			        <th>M-Name</th>
			        <th>DOA</th>
			        <th>DOB</th>
			        <th>Mobile</th>
			        <th>Address</th>
			        <th>Action</th>
			      </tr>
			    </thead>
			    <tbody id="show-student">
			     </tbody>
			  </table>`;
			
			  document.getElementById("student-table").innerHTML=table;
		for (var i = 0; i <localStorage.length; i++) {
		let keys = localStorage.key(i);
		if(keys.match("student"))
		{
			let student = JSON.parse(localStorage.getItem(keys));
			let tr = document.createElement("TR");
			let td_image = document.createElement("TD");
			let image  = student.image;
			let p = document.createElement("P");
			p.className = "p-0 m-0";
			let img = new Image();
			img.src =image;
			img.height="100";
			img.width="100";
			img.style.borderRadius= "50%";
			p.append(img);
			td_image.append(p);
			let td_id = document.createElement("TD");
			td_id.innerHTML =student.student_id;

			let td_name = document.createElement("TD");
			let name  = student.name;
			td_name.innerHTML = name;
			let td_fname = document.createElement("TD");
			let fname = student.fatherName;
			td_fname.innerHTML = fname;
			let td_mname = document.createElement("TD");
			let mname = student.mother_name;
			td_mname.innerHTML = mname;
			let td_doa = document.createElement("TD");
			let doa = student.doa;
			td_doa.innerHTML = doa;
			let td_dob = document.createElement("TD");
			let dob = student.dob;
			td_dob.innerHTML = dob;
			let td_mobile = document.createElement("TD");
			let mobile_one = student.mobile_one;
			td_mobile.innerHTML = mobile_one;
			let td_address = document.createElement("TD");
			let address = student.address;
			td_address.innerHTML = address;
			let td_action = document.createElement("TD");
			
			let div = document.createElement("DIV");
			div.className = "btn-group d-flex  border p-2"
			div.style.borderRadius= "50px";
			let edit = `<span class="material-icons text-primary">edit</span>`;
			let delele = `<span class="material-icons text-danger">delete</span>`;

			let btn_delete = document.createElement("BUTTON");
			btn_delete.setAttribute("sid",student.student_id);
			btn_delete.style.height = "20px";
			btn_delete.style.width = "20px";
			btn_delete.className = "d-flex justify-content-center align-items-center  btn";
			btn_delete.innerHTML = delele;
			let btn_edit = document.createElement("BUTTON");
			btn_edit.setAttribute("sid",student.student_id);
			btn_edit.style.height = "20px";
			btn_edit.style.width = "20px";
			btn_edit.className = "d-flex justify-content-center align-items-center btn mr-3";
			btn_edit.innerHTML = edit;
			div.append(btn_edit);
			div.append(btn_delete);
			td_action.append(div);
			deleteStudent(btn_delete);
			editStudent(btn_edit);
			tr.append(td_image);
			
			tr.append(td_id);
			tr.append(td_name);

			tr.append(td_fname);
			tr.append(td_mname);
			tr.append(td_doa);
			tr.append(td_dob);
			tr.append(td_mobile);
			tr.append(td_address);
			tr.append(td_action);
			document.getElementById("show-student").append(tr);
		}
	}
}

showStudent();

function deleteStudent(btn_delete){
	btn_delete.onclick = function(){
	let id = this.getAttribute("sid");
	let confim = confirm("Are you sure delete this student");
	if(confim)
	{
		localStorage.removeItem("student_"+id);
		if(localStorage.getItem("student_"+id)==null)
		{
			let tr = this.parentElement.parentElement.parentElement ;
			tr.className="animate__animated animate__fadeOutDownBig";
			setTimeout(function(){tr.remove();},500);
		}else{
			alert("delete Faild");
		}	
	}
	}
}
function editStudent(btn_edit){
	
	btn_edit.onclick = function(){
	$(".utility-control").removeClass("d-none");
	document.getElementById("o").value = "u";
	let allStudent = [];
	let id = this.getAttribute("sid");

		for (var i = 0; i <localStorage.length; i++) {
			let keys = localStorage.key(i);
			if(keys.match("student"))
			{
				let student = JSON.parse(localStorage.getItem(keys));
				allStudent.push(student);
			}
		}
		Navigate(allStudent,id);
		
	}

}

function Navigate(allData,id){
	let first = document.getElementById("first");
	let next = document.getElementById("next");
	let prev = document.getElementById("prev");
	let last = document.getElementById("last");
	let index = 0;
	
	first.onclick =function(){
	index = 0;	
	valueMapToControl(allData[index]);
	}

	last.onclick =function(){
	index = allData.length-1;	
	valueMapToControl(allData[index]);
	}

	next.onclick =function(){
		if(allData.length-1 > index)
		{
			index = index+1;
		}else{
			index=0;
		}
	valueMapToControl(allData[index]);
	}

	prev.onclick =function(){
		
		if(index <= 0)
		{
			index=allData.length-1;
		}else{
			index = index-1;
		}

	valueMapToControl(allData[index]);
	}

	allData.forEach(function(data,i){
		if(data.student_id==id)
		{
			index=i;
			valueMapToControl(allData[index]);
		
		let dl = document.getElementById('add');
		dl.style.display="block";
		dl.className="animate__animated animate__zoomIn animate__faster border shadow-sm";
		}
	});

	
}

// value map to control

function valueMapToControl(allData){
	document.getElementById('upload-pic').src = allData.image;
	document.getElementById("student-id").innerHTML = allData.student_id;
	document.getElementById("s-name").value = allData.name;
	document.getElementById("f-name").value = allData.fatherName;
	document.getElementById("m-name").value = allData.mother_name;
	document.getElementById("dob").value = allData.dob;
	document.getElementById("gender").value = allData.gender;
	document.getElementById("doa").value = allData.doa;
	document.getElementById("course").value = allData.course;
	document.getElementById("total-fee").value = allData.total_fee;
	document.getElementById("session").value = allData.session;
	document.getElementById("mobile-one").value = allData.mobile_one
	document.getElementById("mobile-two").value = allData.mobile_two;
	document.getElementById("email").value = allData.email;
	document.getElementById("district").value = allData.district;
	document.getElementById("pincode").value = allData.pincode;
	document.getElementById("address").value = allData.address;

}