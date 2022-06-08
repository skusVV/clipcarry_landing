import Image, { StaticImageData } from "next/image";
import React from "react";
import styles from "./Benefits.module.scss";
import Wrapper from "../Layout/Wrapper/Wrapper";
import benefit1 from "../../../public/benefit_1.png";
import benefit2 from "../../../public/benefit_2.png";
import benefit3 from "../../../public/benefit_3.png";


interface Content {
  label: string;
  title: string;
  text: string[];
  image: StaticImageData;
}

const Benefits = () => {
  const content: Content[] = [
    {
      label: "Benefit 01",
      title: "Recruiters collecting candidate data",
      text: [
        "The original idea of Clipcarry came from our recruiters. They were spending hours digging through candidate profiles and then had to manually transfer candidate data to our recruitment software.",
        "Clipcarry allows you to choose the type of information you are interested in and then save that as you are going through the candidate profiles on LinkedIn, Indeed, or any other job portal. The recruiters also love the feature that allows them to add manual comments about candidates directly on the page - saves them from having to switch between tabs as they are researching candidates."
      ],
      image: benefit1
    },
    {
      label: "Benefit 02",
      title: "Outbound sales reps putting together a list of prospects",
      text: ["Chances are, your outbound sales people are spending a ton of time going through online directories searching for prospects to contact. Clipcarry allows them to define exactly the type of information they need about a prospect, export it as a CSV file, and then import it into the CRM."],
      image: benefit2
    },
    {
      label: "Benefit 03",
      title: "Data analysts collecting structured data",
      text: ["There are plenty of data collection projects that are too small for building custom web scrapers but too big (or annoying) to manually copy-paste. For example, a machine learning analyst building a model that requires sample data from a hundred social media profiles? Just define the fields you are interested in and copy the information in a couple of clicks."],
      image: benefit3
    }
  ];

  const renderBenefitItem = (content: Content[]) => {
    return content.map((item, key) => (
      <div key={key} className={styles.benefits__list__item}>
        <div className={styles.benefits__list__item__image}><Image src={item.image}/></div>
        <div className={styles.benefits__list__item__content}>
          <div className={styles.benefits__list__item__label}>
            <svg width="17" height="1" viewBox="0 0 17 1" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0.5" y1="0.5" x2="16.5" y2="0.5"/>
            </svg>
            <span>{item.label}</span>
          </div>
          <div className={styles.benefits__list__item__title}>{item.title}</div>
          <div className={styles.benefits__list__item__text}>
            { item.text.map(i => <p key={i}>{i}</p>) }
          </div>
        </div>
      </div>
    ));
  }

  return (
    <Wrapper>
      <div className={styles.benefits}>
        <div className={styles.benefits__header}>
          <div className={styles.benefits__header__title}>
            A browser extension that<br/>turns websites into spreadsheets
          </div>
          <div className={styles.benefits__header__subtitle}>
            Here are some examples of what our users do with Clipcarry
          </div>
        </div>
        <div className={styles.benefits__list}>
          {renderBenefitItem(content)}
        </div>
      </div>
    </Wrapper>
  );
};

export default Benefits;
