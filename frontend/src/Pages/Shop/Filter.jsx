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

function Filter({ brands, categories, minPrice, maxPrice }) {
  return (
    <FilterWrapper>
      <h1>Selection</h1>
      <Section>
        <SubHeadingTwo>Price</SubHeadingTwo>
        <SectionItem>
          <PrettoSlider
            valueLabelDisplay="on"
            defaultValue={maxPrice / 2}
            min={minPrice}
            max={maxPrice}
          />
        </SectionItem>
      </Section>
      <Section>
        <SectionHead>
          <ArrowDropDownIcon />
          <SubHeadingTwo>Category</SubHeadingTwo>
        </SectionHead>
        {categories.map((item) => (
          <SectionItem>
            <div>
              <input type="checkbox"></input>
              {item}
            </div>
            <div>
              <p>(2)</p>
            </div>
          </SectionItem>
        ))}
      </Section>
      <Section>
        <SectionHead>
          <ArrowDropDownIcon />
          <SubHeadingTwo>Brands</SubHeadingTwo>
        </SectionHead>
        {brands.map((item) => (
          <SectionItem>
            <div>
              <input type="checkbox"></input>
              {item}
            </div>
            <div>
              <p>(2)</p>
            </div>
          </SectionItem>
        ))}
      </Section>
    </FilterWrapper>
  );
}

export default Filter;
