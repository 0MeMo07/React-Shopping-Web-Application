// import React from 'react';
// import Product from './Product';

// function CategoryList({ products, basket, setBasket, total, money }) {
//   // Check if products is not an array or is undefined
//   if (!Array.isArray(products) || products.length === 0) {
//     return <p>No products available in this category.</p>;
//   }

//   const categories = Array.from(new Set(products.map(product => product.category)));

//   return (
//     <div>
//       {categories.map(category => (
//         <div key={category}>
//           <h2>{category}</h2>
//           <div style={{ display: 'flex', flexWrap: 'wrap' }}>
//             {products
//               .filter(product => product.category === category)
//               .map(product => (
//                 <Product
//                   key={product.id}
//                   product={product}
//                   basket={basket}
//                   setBasket={setBasket}
//                   total={total}
//                   money={money}
//                 />
//               ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default CategoryList;
