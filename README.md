# Gulp Email Framework

A simple, gulp powered framework to develop and test reponsive emails. Inspired by [Gulp Email Creator](https://github.com/darylldoyle/Gulp-Email-Creator) and the [Grunt Email Workflow](https://github.com/leemunroe/grunt-email-workflow).

![email template screenshot](https://cloud.githubusercontent.com/assets/4403029/19772299/0ea6066e-9c66-11e6-97f3-c413eadbefa6.png)


## Installation

Clone this repository to a local folder and run:
```
npm install
```

## Features

### A basic starter template
This framework comes with a ready to use sample start template, which can be modified how you like it. All the assets are &copy Mailchimp

### Automatic CSS Inline and build system
No SCSS, it bites you in the ass when doing responsive emails, trust me

### No more reloading thanks to browser-sync
Browser sync is keeping all the adjustments you make to the E-mail templates in sync and previews changes live, without manually reloading

### Smart partials
We are using gulp-file-include for includes, giving you the option to pass down props to partials like so
```
@@include('./var.html', {
  "name": "haoxin",
  "age": 12345,
  "socials": {
    "fb": "facebook.com/include",
    "tw": "twitter.com/include"
}
```

### Sending test emails via Mailgun and Mandrill
Use mail gun to send preview emails to yourself using `gulp send` (please adjust the setting in the gulp file to the template you want to send. Or if you have an Mandrill you can send the email you are previewing right from the interface.

### A split screen UI for designing your email
Preview and manage all your templates right from the UI, browser-sync will keep all the inframes in sync for you

## How to use
Rename the `config-sample.json` file to `config.json`. Add you api keys for mailgun and mandrill if you want to use either of the service for sending test emails to yourself. Setting up an mailgun account for that is free, but it doesn't support sending emails from the UI.

```
{
  "testing": {
    "from": "from-email",
    "to": "recepit-email",
    "subject": "your-subject-line"
  },

  "auth": {
    "mailgun": {
      "apikey": "your-api-key",
      "sandbox": "your-sandbox-url"
    },
    "mandrill": {
      "apikey": "your-api-key"
    }
  }
}

```

Run the framework by using
```
gulp
```
Now edit the template in
```
src/templates/basic-template.html
```
or create your own from scratch. As long as the gulp task is running it will automaticly build the template on every save and reload the browser. If you create a new template make sure to include it in the panel sidebar. 
```
<div class="template-list">
  <ul>
    <li><a href="/build/basic-template.html">Basic Template</a></li>
    <li><a href="/build/your-new-template">Your newly added Template</a></li>
  </ul>
</div>
```
in `panel/index.html`.

Thanks a lot [Filip](https://github.com/peritus) for helping my with lots of the JS part 😍
