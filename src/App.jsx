import React from "react";
import { useState } from "react";
import { Carousel, Form, Input, InputNumber, Button } from "antd";

function SearchForm({ onFinish }) {
  return (
    <Form name="search_form" onFinish={onFinish} initialValues={{ size: 5 }}>
      <Form.Item name="query" label="Search query" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="size" label="Number of songs">
        <InputNumber defaultValue={5} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form.Item>
    </Form>
  );
}

function MyCarousel({ tracks }) {
  const carouselStyles = {
    width: "640px",
    border: "solid 1px #000",
    margin: "auto",
  };

  function trackToEmbed(track) {
    return (
      <iframe
        key={track.id}
        src={
          "https://open.spotify.com/embed/track/" +
          track.id +
          "?utm_source=generator"
        }
        width="100%"
        border="0"
        height="352"
        frameBorder="0"
        allow={
          "autoplay; " +
          "clipboard-write; " +
          "encrypted-media; " +
          "fullscreen; " +
          "picture-in-picture"
        }
        loading="lazy"
      />
    );
  }

  return (
    <div style={carouselStyles}>
      <Carousel dotPosition="top">{tracks.map(trackToEmbed)}</Carousel>
    </div>
  );
}

async function fetchData(query, limit) {
  const baseURL = "https://www.apitutor.org/spotify/simple/v1/search";
  const params = new URLSearchParams({
    q: query,
    limit: limit,
    type: "track",
  }).toString();
  const url = baseURL + "?" + params;
  console.log(url);
  const response = await fetch(url);
  console.log(response.ok);
  return await response.json();
}

export default function App() {
  const [tracks, setTracks] = useState([]);

  async function onFormSubmit(input) {
    const query = input.query;
    const limit = input.size;
    const data = await fetchData(query, limit);
    console.log(data);
    setTracks(data);
  }

  return (
    <>
      <header>
        <h1>Spotify Demo</h1>
      </header>
      <main>
        <SearchForm onFinish={onFormSubmit} />
        <MyCarousel tracks={tracks} />
      </main>
      <p>
        <a href="https://github.com/nfitzen/se-spotify-project">GitHub</a>
      </p>
    </>
  );
}
