require("dotenv").config();
const Koa = require("koa");
const speakeasy = require("speakeasy");
const qrcode = require("qrcode");
const cors = require("kcors");
const bodyParser = require("koa-bodyparser");
const koaStatic = require("koa-static");
const mount = require("koa-mount");
const router = require("koa-router")();

const PORT = process.env.PORT;
const API_BASE_URL = process.env.API_BASE_URL;

const validEmail = "tester@test.com";
const validPassword = "test";

var secret;

const app = new Koa();
app.use(cors());
app.use(bodyParser());

router
  .post(`/register-otp`, async (ctx, next) => {
    secret = speakeasy.generateSecret(); // Get the data URL of the authenticator URL
    img_data = await new Promise((resolve, reject) => {
      qrcode.toDataURL(secret.otpauth_url, function (err, data_url) {
        resolve(data_url);
      });
    });

    ctx.response.body = img_data;
  })
  .post("/login", async (ctx, next) => {
    const { email, password, userToken } = ctx.request.body;
    console.log(userToken);
    if (!secret) {
      ctx.throw(401, "Uninitialized QR Code");
    }

    // if (email !== validEmail)
    //   ctx.throw(401, "badEmail");

    // if (password !== validPassword)
    //   ctx.throw(401, "badPassword");

    const verified = speakeasy.totp.verify({
      secret: secret.base32,
      encoding: "base32",
      token: userToken,
    });

    if (!verified) ctx.throw(401, "User Token is Invalid");

    ctx.response.body = "User Token is Valid";
  });

app.use(mount(koaStatic("./client-v1/build"))).use(router.routes());

console.log(`Server now running on localhost:${PORT}`);
console.log(
  `Open browser to http://localhost:${PORT} to try login with an OTP`
);
app.listen(PORT);
