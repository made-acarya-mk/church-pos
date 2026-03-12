'use client'

import { useQuery } from '@tanstack/react-query'

async function fetchProducts() {
  const res = await fetch('http://localhost:3000/products')
  const data = await res.json()
  return data.data
}

export default function ProductsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Products</h1>

      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}