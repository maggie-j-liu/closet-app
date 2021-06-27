const { ClarifaiStub, grpc } = require("clarifai-nodejs-grpc");
const stub = ClarifaiStub.grpc();
const CLARIFAI_API_KEY = process.env.CLARIFAI_API_KEY;
const metadata = new grpc.Metadata();
metadata.set("authorization", "Key " + CLARIFAI_API_KEY);

export default async (req, res) => {
  const data = req.body.base64;
  console.log(data);
  let f = new Promise((resolve, reject) => {
    stub.PostModelOutputs(
      {
        /* idk what this is but it works! */
        model_id: "aaa03c23b3724a16a56b629203edc62c",
        inputs: [{ data: { image: { base64: data } } }],
      },
      metadata,
      (err, response) => {
        if (err) {
          resolve([]);
          return;
        } else if (response.status.code !== 10000) {
          resolve([]);
          console.log(
            "Received failed status: " +
              response.status.description +
              "\n" +
              response.status.details
          );
          return;
        }
        {
          let ret = [];
          for (const c of response.outputs[0].data.concepts) {
            ret.push([c.name, c.value]);
          }
          console.log(ret);
          resolve(ret);
        }
      }
    );
  });
  res.json(await f);
};
