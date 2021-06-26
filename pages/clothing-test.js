import React, { Fragment } from "react";

export default function ClothingTest() {
	const [image, setImage] = React.useState();
	const [file, setFile] = React.useState();
	const read = (event) => {
	  const reader = new FileReader()
	  reader.readAsDataURL(event.target.files[0]);
	   reader.addEventListener("load", function () {
	   	let url = reader.result;
	   	url = url.replace('data:image/jpeg;base64,', '');
	   	fetch(`https://clothing-api-server.vercel.app/fetch`, {
	   	  method: 'POST',
	      headers: {
	        'content-type': 'application/json',
	      },
	      body: JSON.stringify({
	      	base64: url
	      })
		   }).then(data => {
		   	console.log(data.body);
		   	setFile(data.body);
		   })
		 }, false);
	}
	return (
		<div>
	<input
        type="file"
        accept="image/jpeg, image/png"
        className={"p-0.5 rounded-md focus-ring w-min"}
        onChange={(e) => {
        	console.log(URL.createObjectURL(e.target.files[0]));
			setImage(URL.createObjectURL(e.target.files[0]));
        	/* console.log(e.target.files[0]); */
			read(e);
        }}
      />
      <img src={image} className={"w-3/4 m-auto"} />
      <pre src={file}></pre>
      </div>
     )
}