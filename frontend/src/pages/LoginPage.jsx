import kvRing from "../assets/kv-xl.png";

const LoginPage = () => {
  return (
    <section className="login-page">
      <div className="section-kv">
        <div className="kv">
          <div className="kv__outer1">
            <div>
              <img src={kvRing} alt="Outer ring" width="1174" height="1150" />
            </div>
          </div>

          <div className="kv__outer2">
            <div>
              <img src={kvRing} alt="Inner ring" width="1174" height="1150" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LoginPage;