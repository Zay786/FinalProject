import React, { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Service.css";

const servicesData = [
  {
    title: "Road Transport",
    description: "Reliable ground shipping across continents.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-FCFdjHKQdgmqjL9kuxT7ku0ZUoBeTWjT3A&s",
  },
  {
    title: "Air Transport",
    description: "Expedited air cargo for urgent deliveries.",
    img: "https://i0.wp.com/www.ronishlogistics.com/wp-content/uploads/2025/06/Cargo-Plane.jpg?resize=1080%2C749",
  },
  {
    title: "Ocean Freight",
    description: "Global sea freight for bulk shipments.",
    img: "https://images.ctfassets.net/92fo1e671z6m/2IZoxwY6Ob7UVZSck6hv1w/a19a7932e360d1263ca31ef15a5cb34a/Ocean-freight_header_img-2.jpg?w=2880&h=1252&fl=progressive&q=80&fm=jpg&bg=transparent",
  },
  {
    title: "Train Transport",
    description: "Eco-friendly rail transport solutions.",
    img: "https://3.imimg.com/data3/DI/VE/MY-973327/train-cargo-services-500x500.jpg",
  },
  {
    title: "Customs & Clearance",
    description: "Seamless customs processing and compliance.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRbLoVUa6CsdM803swz4TD5aSen3987S5iXg&s",
  },
];

export default function Service() {
  const [page, setPage] = useState(0);
  const timerRef = useRef(null);

  const firstSet = servicesData.slice(0, 3);
  const secondSet = servicesData.slice(3, 5);
  const displayedServices = page === 0 ? firstSet : secondSet;

  // 🔁 function to start / restart timer
  const startAutoSwitch = (delay = 9000) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setPage((prev) => (prev === 0 ? 1 : 0));
    }, delay);
  };

  // initial auto-switch
  useEffect(() => {
    startAutoSwitch();

    return () => clearTimeout(timerRef.current);
  }, [page]);

  // manual click handler
  const handleDotClick = (index) => {
    setPage(index);
    startAutoSwitch(9000); // ⬅️ wait 5 seconds after click
  };

  return (
    <>
      <Navbar />

      <div className="services-container">
        <h1 className="services-title">Our Specialised Services</h1>

        <div className="service-cards-wrapper">
          {displayedServices.map((service, index) => (
            <div className="service-card" key={index}>
              <img src={service.img} alt={service.title} />
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>

        {/* Pagination Dots */}
        <div className="pagination-dots">
          <span
            className={page === 0 ? "dot active" : "dot"}
            onClick={() => handleDotClick(0)}
          ></span>
          <span
            className={page === 1 ? "dot active" : "dot"}
            onClick={() => handleDotClick(1)}
          ></span>
        </div>
      </div>

      <Footer />
    </>
  );
}
