//handles all test requests utilizing injected services

async function add_test(req, res) {
  try {
    console.log("===req==", req.body);
    console.log("=====srv=====", req.service);

    let test_resp = await req.service.add_test(req.body.data);
    res.status(200).send({
      message: "saved successfully!",
      test_id: `${test_resp.test_id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}
async function list_test(req, res) {
  try {
    console.log(req.body);
    console.log(req.service);
    //let result = srv.Admin_srv.add_admin(req.body.data);
    let result = await req.service.list_test(req.body.data);
    res.status(200).send({
      correlationid: req.body.data.correlationid,
      message: "saved successfully!",
      admin_id: `${result.admin_id}`,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
}

module.exports = {
  add_test,
  list_test,
};
