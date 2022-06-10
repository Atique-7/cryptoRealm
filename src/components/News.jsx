import { Select, Typography, Row, Col, Card } from "antd"
import moment from "moment"
import Spinner from "../components/shared/Spinner"
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi"
import { useGetCryptosQuery } from "../services/cryptoApi"
import { useState } from "react"

const { Text, Title } = Typography
const { Option } = Select
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News"

function News({ simplified }) {
  const [newsCategory, setNewsCategory] = useState("Cryptocurrency")
  const { data } = useGetCryptosQuery(25)
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory: newsCategory,
    count: simplified ? 6 : 12,
  })

  if (!cryptoNews?.value) return <Spinner />
  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            className="select-news"
            placeholder="select a crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="Cryptocurrency"></Option>
            {data?.data?.coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.name.length > 60
                    ? `${news.name.substring(0, 60)}...`
                    : news.name}
                </Title>
                <img src={news?.image?.thumbnail?.contentUrl || demoImage} />
              </div>
              <p>
                {news.description.length > 10
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="provider-container">
                <div></div>
                <Text>
                  {moment(news.datePublished).startOf("ss").fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
