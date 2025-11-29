import ArtistaPage from './client'

// Gerar rotas estáticas para export (GitHub Pages)
export function generateStaticParams() {
  return [
    { id: '1' }, { id: '2' }, { id: '3' }, { id: '4' }, { id: '5' },
    { id: '6' }, { id: '7' }, { id: '8' }, { id: '9' }, { id: '10' },
    { id: '11' }, { id: '12' }
  ]
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return <ArtistaPage id={id} />
}
