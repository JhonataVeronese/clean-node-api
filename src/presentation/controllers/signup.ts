export class SignUpController {
  handle(httpResponse: any): any {
    if (!httpResponse.body.name) {
      return { statusCode: 400, body: new Error('Missing param: name') }
    }
    if (!httpResponse.body.email) {
      return { statusCode: 400, body: new Error('Missing param: email') }
    }
  }
}
