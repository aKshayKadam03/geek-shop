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

const AirbnbSlider = withStyles({
  root: {
    color: "#3a8589",
    height: 3,
    padding: "13px 0",
  },
  thumb: {
    height: 27,
    width: 27,
    backgroundColor: "#fff",
    border: "1px solid currentColor",
    marginTop: -12,
    marginLeft: -13,
    boxShadow: "#ebebeb 0 2px 2px",
    "&:focus, &:hover, &$active": {
      boxShadow: "#ccc 0 2px 3px 1px",
    },
    "& .bar": {
      // display: inline-block !important;
      height: 9,
      width: 1,
      backgroundColor: "currentColor",
      marginLeft: 1,
      marginRight: 1,
    },
  },
  active: {},
  track: {
    height: 3,
  },
  rail: {
    color: "#d8d8d8",
    opacity: 1,
    height: 3,
  },
})(Slider);

function AirbnbThumbComponent(props) {
  return (
    <span {...props}>
      <span className="bar" />
      <span className="bar" />
      <span className="bar" />
    </span>
  );
}

function Filter({ brands, categories }) {
  return (
    <FilterWrapper>
      <h1>Selection</h1>
      <Section>
        <SubHeadingTwo>Price</SubHeadingTwo>
        <SectionItem>
          <AirbnbSlider
            ThumbComponent={AirbnbThumbComponent}
            getAriaLabel={(index) =>
              index === 0 ? "Minimum price" : "Maximum price"
            }
            defaultValue={[20, 40]}
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
