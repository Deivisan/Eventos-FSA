// EventosFSA - API de Logout
import { NextRequest, NextResponse } from 'next/server'
import { invalidateSession } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('auth_token')?.value

    if (token) {
      await invalidateSession(token)
    }

    // Limpar cookie
    cookieStore.delete('auth_token')

    return NextResponse.json({
      success: true,
      message: 'Logout realizado com sucesso!'
    })

  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
