import { NextResponse } from 'next/server'

class ApiResponse {
  static success(data: any, status: number = 200) {
    return NextResponse.json({ data, success: true }, { status })
  }

  static error(message: string, status: number = 500) {
    console.log('message: ', message)
    return NextResponse.json({ error: message, success: false }, { status })
  }
}

export default ApiResponse
