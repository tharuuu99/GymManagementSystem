

const Logo = () => {
  return (
    <div className="logo-container text-center">
      <div className="flex">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="100"
        height="100"
        className="mb-4"
      >
        {/* One side of the V */}
        <rect
          x="50"
          y="50"
          width="20"
          height="100"
          transform="rotate(-45 50 50)" // Rotate to create the diagonal
          fill="white"
        />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 200"
        width="100"
        height="100"
        className="mb-4"
      >
        {/* Other side of the V */}
        <rect
          x="130"
          y="50"
          width="20"
          height="100"
          transform="rotate(45 130 50)" // Rotate in the opposite direction
          fill="white"
        />
      </svg>
      </div>
      <h1 className="text-white font-bold text-3xl">MINATOR</h1>
    </div>
  );
};

export default Logo;
