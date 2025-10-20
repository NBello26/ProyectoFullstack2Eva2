import React, { useState, useEffect } from "react";

// Átomo: select combinado de región y comuna
const comunasPorRegion = {
  Lagos: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"],
  Metropolitana: ["Santiago", "Providencia", "Las Condes", "Maipú", "Ñuñoa"],
  Araucanía: ["Temuco", "Padre Las Casas", "Villarrica", "Pucón"],
  Biobío: ["Concepción", "Talcahuano", "Chiguayante", "Los Ángeles"]
};

const SelectRegionComuna = ({ region, setRegion, comuna, setComuna }) => {
  const [comunas, setComunas] = useState([]);

  useEffect(() => {
    if (region && comunasPorRegion[region]) {
      setComunas(comunasPorRegion[region]);
    } else {
      setComunas([]);
      setComuna("");
    }
  }, [region, setComuna]);

  return (
    <>
    <div className="input-row">
        <label htmlFor="region">Región</label>
      <select
        id="region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        required
      >
        <option value="">Seleccione región</option>
        {Object.keys(comunasPorRegion).map((r) => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>

      <label htmlFor="comuna">Comuna</label>
      <select
        id="comuna"
        value={comuna}
        onChange={(e) => setComuna(e.target.value)}
        required
      >
        <option value="">Seleccione comuna</option>
        {comunas.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
    </div>
    </>
  );
};

export default SelectRegionComuna;
