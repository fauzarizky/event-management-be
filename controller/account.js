const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const hbs = require("handlebars");
const { Account, Referral } = require("../models");
const fs = require("fs");


const JWT_SECRET_KEY = "belom-diganti";

exports.handleRegister = async (req, res) => {
  const { firstName, lastName, username, password, email, phoneNumber, accountType } =
    req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const referral = await Referral.create({
        code: "MYTIX-" + username.toUpperCase(),
      });

    const result = await Account.create({
        firstName,
        lastName,
      username,
      password: hashPassword,
      email,
      phoneNumber,
      referralId: referral.id,
      accountType
    });

   
    /*
    const templateRaw = fs.readFileSync(
      __dirname +
       "/../templates/register.html",
       "utf-8");
    

    const templateCompile = hbs.compile(templateRaw);
    const emailHTML = templateCompile({
      firstName: profile.firstName
    });
    const resultEmail = await mailer.sendMail({
      to: result.email,
      from: "praytodonaana@gmail.com",
      subject: "Registrasi Berhasil",
      html: emailHTML,
    });
    */
    

    res.json({
      ok: true,
      data: {
        username: result.username,
        email: result.email,
        firstName: result.firstName,
        lastName: result.lastName,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({
      ok: false,
      message: String(error),
    });
  }
};

exports.handleLogin = async (req, res) => {
  const { user_identity: userIdentity, password } = req.body;

  try {
    const account = await Account.findOne({
      where: {
        [Op.or]: {
          email: userIdentity,
          username: userIdentity,
          password: userIdentity,
        },
      },
    });

    if (!account) {
      res.status(401).json({
        ok: false,
        message: "incorrect username/password",
      });
      return;
    }

    const isValid = await bcrypt.compare(password, account.password);
    if (!isValid) {
      res.status(401).json({
        ok: false,
        message: "incorrect username/password",
      });
      return;
    }
    const payload = { id: account.id, isVerified: account.isVerified };
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({
      ok: true,
      data: {
        token,
        profile: {
        firstName: account.firstName,
          lastName: account.lastName,
          email: account.email,
          username: account.username,
          phoneNumber: account.phoneNumber,
          referralId: account.referralId,
          accountType: account.accountType,
          accountPoint: account.accountPoint,
        },
      },
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      message: String(error),
    });
  }
};


exports.handleUploadPhotoProfile = async (req, res) => {
const {filename} = req.file;
const {id: accountId} = req.user;

try {
const profile = await Account.findOne({ where: { accountId, } }); 
if (profile.profilePicture) {
  fs.rmSync(__dirname + "/../public/" + profile.profilePicture);
}

profile.profilePicture = filename;
await profile.save();

res.json({
  ok: true,
  date: "Profile picture updated",
});
} catch(error) {
  res.status(500).json({
    ok: false,
    message: String(error),
  })
}
};