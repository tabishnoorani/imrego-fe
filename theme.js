const config = require('./src/config');
module.exports = { 
    "@primary-color" : config.THEME.PRIMARY_COLOR,

    //Buttons
    "@btn-primary-color" : config.THEME.BUTTON_FONT_COLOR,
    "@btn-danger-bg" : config.THEME.DANGER_BUTTON_BG_COLOR,
    "@btn-danger-color " : 'white',

    //card
    "@card-head-color": "@heading-color",
    "@card-head-background": "@component-background",
    "@card-head-padding": "16px",
    "@card-inner-head-padding": "12px",
    "@card-padding-base": "24px",
    "@card-padding-wider": "32px",
    "@card-actions-background": "@background-color-light",
    "@card-shadow": "0 2px 8px rgba(0, 0, 0, .09)"
}
