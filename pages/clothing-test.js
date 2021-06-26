import React, { Fragment } from "react";

export default function ClothingTest() {
	const [file, setFile] = React.useState();
	const read = (event) => {
	  const reader = new FileReader()
	  reader.readAsDataURL(event.target.files[0]);
	   reader.addEventListener("load", function () {
	   	let url = reader.result;
	   	/* extract the prefict to get base64 */
	   	url = url.replace('data:image/jpeg;base64,', '');
	   	/* fetch the data */
	   	fetch(`https://clothing-api-server.vercel.app/fetch`, {
	   	  method: 'POST',
	      headers: {
	        'content-type': 'application/json',
	      },
	      body: JSON.stringify({
	      	base64: url
	      })
		   }).then(data => {
		   	data.json().then(stuff => {
		   		console.log(JSON.stringify(stuff));
		   		setFile(JSON.stringify(stuff))
		   	})
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
			read(e);
        }}
      />
      <pre>{file}</pre>
      </div>
     )
}