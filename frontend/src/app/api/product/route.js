const productData = [
{
    id: 1,
    slug: "hazelnut-latte",
    image: "/img/menu1.jpg",
    title: "Hazelnut Latte",
    desc: "You can explore the menu that we provide with fun and have their own taste and make your day better.",
    priceBefore: 40000,
    price: 20000,
    flashSale: true,
},
{
    id: 2,
    slug: "mocha-latte",
    image: "/img/menu2.png",
    title: "Mocha Latte",
    desc: "A mix of chocolate and espresso to brighten your mood.",
    priceBefore: 42000,
    price: 21000,
    flashSale: true,
},
{
    id: 3,
    slug: "caramel-macchiato",
    image: "/img/menu3.png",
    title: "Caramel Macchiato",
    desc: "Espresso with caramel flavor that gives a sweet touch to your day.",
    priceBefore: 35000,
    price: 14000,
    flashSale: true,
},
{
    id: 4,
    slug: "vanilla-latte",
    image: "/img/menu4.png",
    title: "Vanilla Latte",
    desc: "Smooth and creamy latte with a hint of vanilla aroma.",
    priceBefore: 25000,
    price: 19000,
    flashSale: true,
},
{
    id: 5,
    slug: "americano",
    image: "/img/menu4.png",
    title: "Americano",
    desc: "Classic black coffee for a strong and bold flavor.",
    priceBefore: 19000,
    price: 8000,
    flashSale: true,
},
{
    id: 6,
    slug: "espresso",
    image: "/img/menu3.png",
    title: "Espresso",
    desc: "Pure espresso shot to keep you energized.",
    priceBefore: 18500,
    price: 14000,
    flashSale: true,
},
{
    id: 7,
    slug: "matcha-latte",
    image: "/img/menu2.png",
    title: "Matcha Latte",
    desc: "Green tea blend with milk for a relaxing taste.",
    priceBefore: 30000,
    price: 23000,
    flashSale: true,
},
{
    id: 8,
    slug: "cold-brew",
    image: "/img/menu1.jpg",
    title: "Cold Brew",
    desc: "Smooth and refreshing coffee brewed cold for hours.",
    priceBefore: 26000,
    price: 24000,
    flashSale: true,
}];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const product = productData.find((item) => item.id === parseInt(id));
    if (product) {
      return Response.json(product);
    } else {
      return new Response(JSON.stringify({ message: "Product not found" }), {
        status: 404,
      });
    }
  }

  return Response.json(productData);
}

export async function POST(request) {
  try {
    const newProduct = await request.json();

    // Validasi sederhana
    if (!newProduct.title || !newProduct.price) {
      return new Response(JSON.stringify({ message: "Invalid data" }), {
        status: 400,
      });
    }

    // Simulasi penambahan ke array (karena ini bukan DB)
    const id = productData.length + 1;
    const slug = newProduct.title.toLowerCase().replace(/\s+/g, "-");

    const product = {
      id,
      slug,
      image: newProduct.image || "/img/default.png",
      title: newProduct.title,
      desc: newProduct.desc || "",
      priceBefore: newProduct.priceBefore || newProduct.price,
      price: newProduct.price,
      flashSale: newProduct.flashSale ?? false,
    };

    productData.push(product);

    return new Response(JSON.stringify(product), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return new Response(JSON.stringify({ message: "Server Error" }), {
      status: 500,
    });
  }
}