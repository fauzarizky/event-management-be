const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");
const hbs = require("handlebars");
const { Account, Referral } = require("../models");
const fs = require("fs");


const JWT_SECRET_KEY = "ntar-pindah-ke-env";

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
    

    res.json({
      ok: true,
      data: {
        username: result.username,
        email: result.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
      },
    });
console.log(resultEmail);

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
      include: Profile,
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
        firstName: account.Profile.firstName,
          lastName: account.Profile.lastName,
          email: account.email,
          username: account.username,
          phoneNumber: account.phoneNumber,
          referralId: account.referralId,
          accountType: account.accountType,
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

exports.updateProfile = async (req, res) => {
  const accountId = req.user.id;
  const { bio, email, username } = req.body;
  try {
    const account = await Account.findByPk(accountId);
    if (!account) {
      res.status(400).json({
        ok: false,
        message: "account not found",
      });
      return;
    }

    if (email) {
      account.email = email;
      account.isVerified = false;
    }
    if (username) {
      account.username = username;
    }

    await account.save();

    const profile = await account.getProfile();
    if (bio) {
      profile.bio = bio;
    }
    await profile.save();

    return res.json({
      ok: true,
      data: {
        email: account.email,
        username: account.username,
        phoneNumber: account.phoneNumber,
        isVerified: account.isVerified,
        firstName: profile.firstName,
        lastName: profile.lastName,
        bio: profile.bio,
      },
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      message: String(error),
    });
    return;
  }
};


exports.handleUploadPhotoProfile = async (req, res) => {
const {filename} = req.file;
const {id: accountId} = req.user;

try {
const profile = await Profile.findOne({ where: { accountId, } }); 
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