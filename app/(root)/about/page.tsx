import Image from 'next/image';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">About Our E-commerce Shop</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src="/assets/profile.jpg"
            alt="Our Store"
            width={300}
            height={400}
            className="rounded-lg shadow-md"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="mb-4">
            Founded in 2024, our e-commerce shop has been dedicated to providing high-quality products 
            and exceptional customer service. We started with a simple idea: to make online shopping 
            easy, enjoyable, and reliable for everyone.
          </p>
          <p className="mb-4">
            Over the years, we&apos ve grown from a small startup to a trusted name in e-commerce, 
            all while maintaining our commitment to our customers and our values.
          </p>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p>
            We strive to offer a wide range of products at competitive prices, ensuring that our 
            customers always find what they&apos re looking for. Our mission is to make online shopping 
            accessible, secure, and satisfying for shoppers around the world.
          </p>
        </div>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <ul className="list-disc pl-6">
          <li>Wide selection of high-quality products</li>
          <li>Competitive prices and regular deals</li>
          <li>Fast and reliable shipping</li>
          <li>Exceptional customer service</li>
          <li>Secure and easy-to-use platform</li>
        </ul>
      </div>
    </div>
  );
}