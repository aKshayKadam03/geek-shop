import React from "react";
import styled from "styled-components";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paragraph,
  SubHeadingOne,
  SubHeadingThree,
} from "../../Components/Global/Typography";
import Rating from "@material-ui/lab/Rating";
import StarOutlineOutlinedIcon from "@material-ui/icons/StarOutlineOutlined";

const ReviewsWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  margin: 100px auto;
  flex-direction: column;
`;

const ReviewsHead = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 25px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #c5c2c2;
  border-bottom: 1px solid #c5c2c2;
  > div {
    margin: 10px;
  }
  h2 {
    font-size: 60px;
    color: #353333;
  }
`;

const ReviewsBody = styled.div`
  width: 100%;
  max-width: 1400px;
  margin: 50px auto;
`;

const ReviewsCard = styled.div`
  padding: 10px;
  display: flex;
  align-items: flex-start;
  background-color: #f3f2f2;
  margin: 5px;

  p {
    font-weight: 600;
    font-size: 14px;
    text-transform: capitalize;
  }
  > div {
    margin: 10px;
  }
  > div:nth-child(2) {
    display: flex;
    flex-direction: column;
  }
`;

const ReviewForm = styled.div`
  form {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 20px 0 80px;
    > div {
      margin: 10px;
    }
  }
  label {
    display: block;
    font-weight: 400;
    margin: 5px 0;
    text-transform: uppercase;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    letter-spacing: 0.2ch;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 20px;
  }
  textarea {
    width: 100%;
    padding: 10px;
    font-size: 20px;
    height: 100px;
  }
  button {
    width: 200px;
    padding: 10px;
    border: none;
    background-color: ${(props) => props.theme.btnBackground};
    color: white;
    border-radius: 5px;
    font-size: 16px;
  }
`;

const initState = {
  productId: "",
  userId: "",
  title: "",
  message: "",
  rating: 0,
};

function Reviews({ reviews, ratings, productId }) {
  const [userReviewData, setUserReviewData] = React.useState(initState);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserReviewData({ ...userReviewData, [name]: value });
  };

  React.useEffect(() => {
    setUserReviewData({ ...userReviewData, productId: productId });
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log(userReviewData);
  };

  return (
    <ReviewsWrapper>
      <ReviewsHead>
        <div>
          <SubHeadingOne>{ratings === undefined ? 0 : ratings}</SubHeadingOne>
        </div>
        <div>
          <Rating size="large" value={+ratings} readOnly></Rating>
        </div>
        <div>
          <Paragraph>{reviews?.length} Reviews</Paragraph>
        </div>
      </ReviewsHead>

      <ReviewsBody>
        <ReviewForm>
          <form onSubmit={onSubmitHandler}>
            <div>
              <label>Rate</label>
              <Rating
                onChange={onChangeHandler}
                name="rating"
                size="large"
              ></Rating>
            </div>
            <div>
              <label>Title</label>
              <input name="title" required onChange={onChangeHandler} />
            </div>
            <div>
              <label>Review</label>
              <textarea name="message" required onChange={onChangeHandler} />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </ReviewForm>
        {reviews?.map((item) => (
          <ReviewsCard>
            <div>
              <Avatar>{item.userId.first_name[0].toUpperCase()}</Avatar>
            </div>
            <div>
              <div>
                <p>{item.userId.first_name + " " + item.userId.last_name}</p>
              </div>
              <div>
                <Rating size="small" value={+item.rating} readOnly></Rating>
              </div>
              <div>
                <b>{item.title}</b>
              </div>
              <div>
                <span>{item.message}</span>
              </div>
            </div>
          </ReviewsCard>
        ))}
      </ReviewsBody>
    </ReviewsWrapper>
  );
}

export default Reviews;
