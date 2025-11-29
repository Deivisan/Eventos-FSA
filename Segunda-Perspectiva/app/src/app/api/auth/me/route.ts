// EventosFSA - API de Usuário Atual
import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser, sanitizeUser } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Não autenticado', user: null },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: sanitizeUser(user)
    })

  } catch (error) {
    console.error('Erro ao obter usuário:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    )
  }
}
