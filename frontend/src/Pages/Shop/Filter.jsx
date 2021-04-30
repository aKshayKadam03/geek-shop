import React from "react";
import styled from "styled-components";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import {
  MainHeading,
  Paragraph,
  SubHeadingOne,
  SubHeadingTwo,
} from "../../Components/Global/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";

import Checkbox from "@material-ui/core/Checkbox";

const FilterWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Section = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: space-between;
  border-bottom: 1px solid #e3e3e3;
  padding: 20px 0px;
`;

const SectionHead = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  font-size: 25px;
  margin: 10px 0;
`;

const SectionItem = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: right;
  padding-left: 10px;
  text-transform: capitalize;
  input {
    margin: 5px;
  }
  > div {
    margin: 5px 10px;
  }
`;

const PrettoSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,

    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function Filter({
  brands,
  categories,
  minPrice,
  maxPrice,
  setPriceLimit,
  onCategoryChangeHandler,
  onBrandChangeHandler,
}) {
  return (
    <FilterWrapper>
      <h1>Selection</h1>
      <Section>
        <SubHeadingTwo>Price</SubHeadingTwo>
        <SectionItem>
          <PrettoSlider
            valueLabelDisplay="on"
            min={minPrice}
            max={maxPrice}
            onChangeCommitted={(e, value) => setPriceLimit(value)}
          />
        </SectionItem>
      </Section>
      <Section>
        <SectionHead>
          <ArrowDropDownIcon />
          <SubHeadingTwo>Category</SubHeadingTwo>
        </SectionHead>
        {categories.map((item, index) => (
          <SectionItem key={item[0]}>
            <div>
              <label>
                <input
                  className="categories"
                  onChange={onCategoryChangeHandler}
                  type="checkbox"
                  name={item[0]}
                ></input>
                {item[1].name}
              </label>
            </div>
            <div>
              <p>{item[1].items}</p>
            </div>
          </SectionItem>
        ))}
      </Section>
      <Section>
        <SectionHead>
          <ArrowDropDownIcon />
          <SubHeadingTwo>Brands</SubHeadingTwo>
        </SectionHead>
        {brands.map((item, index) => (
          <SectionItem key={item[0]}>
            <div>
              <label>
                <input
                  className="brands"
                  onChange={onBrandChangeHandler}
                  name={item[0]}
                  type="checkbox"
                ></input>
                {item[1].name}
              </label>
            </div>
            <div>
              <p>{item[1].items}</p>
            </div>
          </SectionItem>
        ))}
      </Section>
    </FilterWrapper>
  );
}

export default Filter;
