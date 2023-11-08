const cookieObj = {
  cpu: "",
  arch: "",
  freemem: "",
  hostname: "",
  platform: "",
  totalmem: "",
  type: "",
  uptime: "",
};

const setCookie = (req, res) => {
  let cookies = req.cookies;

  if (!cookies?.checksums) {
    res.cookie("checksums", cookieObj);
  }
};

module.exports = { setCookie, cookieObj };
