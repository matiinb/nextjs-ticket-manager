import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import ValidateSignup from "./validate-signup";
import { prisma } from "@/db"

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const requestUrl = new URL(request.url)
  const formData = await request.formData()
  const email = String(formData.get('email'))
  const username = String(formData.get('username'))
  const password = String(formData.get('password'))
  const passwordConf = String(formData.get('passwordConf'))
  const validation = ValidateSignup({email, username, password, passwordConf})

  if (validation != '') {
    return NextResponse.redirect(
        `${requestUrl.origin}/signup?error=` + validation,
        {
          // a 301 status is required to redirect from a POST to a GET route
          status: 301,
        }
    )
  }

  const supabase = createRouteHandlerClient({ cookies })

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${requestUrl.origin}/auth/callback`,
    },
  })

  var dbError

  try {
    await prisma.user.create({
      data: {
        email: email,
        username: username,
        public: false
      }
    })
  } catch (error) {
    dbError = error
  }

  if (error || dbError) {
    var errorToShow

    if (error) errorToShow = error
    if (dbError) errorToShow = dbError

    return NextResponse.redirect(
      `${requestUrl.origin}/signup?error=` + errorToShow,
      {
        // a 301 status is required to redirect from a POST to a GET route
        status: 301,
      }
    )
  }

  return NextResponse.redirect(
    `${requestUrl.origin}/dashboard`,
    {
      // a 301 status is required to redirect from a POST to a GET route
      status: 301,
    }
  )
}
