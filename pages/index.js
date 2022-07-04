import styles from "../styles/Home.module.css";
import es from "./locales/es.json";
import en from "./locales/en.json";
import { useLanguage } from "../hooks/useLanguage";
import { useRouter } from "next/router";
const checkLanguage = ({ language, es, en }) => {
  if (language === "es") {
    return es;
  }
  return en;
};
export default function Home({ products }) {
  const { text, language } = useLanguage({ es, en });
  const router = useRouter();
  const { pathname } = router;
  const changeLang = (e) => {
    const locale = e.target.value;
    router.push(pathname, router.asPath, { locale });
  };
  return (
    <div className={styles.container}>
      <select onChange={changeLang}>
        <option value="es">Español</option>
        <option value="en">English</option>
      </select>
      <h2>{text.welcome__message}</h2>
      <div className={styles.products__box}>
        {products.map((product, index) => (
          <div className={styles.product__item} key={index}>
            <img
              src={`${process.env.NEXT_PUBLIC_API_URL}${product.attributes?.image?.data.attributes.formats.thumbnail.url}`}
            />
            <span>
              {checkLanguage({
                language,
                es: product.attributes.name,
                en: product.attributes.name_en,
              })}
            </span>
            <span>
              {checkLanguage({
                language,
                es: product.attributes.description,
                en: product.attributes.description_en,
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
export async function getServerSideProps() {
  const data = await fetch(`${process.env.API_URL}/products?populate=*`);
  const productsData = await data.json();
  return {
    props: {
      products: productsData.data.length ? productsData.data : [],
    },
  };
}
