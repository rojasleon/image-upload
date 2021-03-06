import { useQuery } from 'react-query';
import {
  Card,
  CardImage,
  CardBody,
  CardText,
  CardTitle
} from '../components/card';
import Title from '../components/title';
import Spinner from '../components/spinner';
import { fetcher } from '../api/fetcher';
import { formattedDate } from '../utils';

const Home = () => {
  const { isLoading, error, data } = useQuery(
    'posts',
    async () => await fetcher('/api/posts')
  );

  if (isLoading) return <Spinner />;
  if (error) return 'An error has occurred: ' + error;

  return (
    <>
      <Title>Posts</Title>
      <div className="row justify-content-center">
        <div className="col col-lg-6">
          {data.data.length === 0 && (
            <button type="button" className="btn btn-primary btn btn-block">
              No posts created
            </button>
          )}
          {data.data.map((post) => (
            <Card key={post.id}>
              <CardImage
                src={`https://upload-123.s3.us-east-2.amazonaws.com/${post.imageUrl}`}
                alt={post.title}
              />
              <CardBody>
                <CardTitle>{post.title}</CardTitle>
                <CardText>{post.description}</CardText>
                <div className="row">
                  <div className="col text-left">@{post.user.username}</div>
                  <div className="col">
                    <p className="text-right text-black-50">
                      {formattedDate(new Date(post.createdAt))}
                    </p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
