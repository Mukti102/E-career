import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
// Data karier berdasarkan RIASEC
const careerData = [
  {
    riasec: "R",
    category: "Teknis & Praktis",
    role: "Insinyur",
    examples: [
      "Insinyur Mesin",
      "Insinyur Sipil",
      "Teknisi Listrik",
      "Tukang Kayu",
    ],
  },
  {
    riasec: "R",
    category: "Teknis & Praktis",
    role: "Teknisi",
    examples: ["Teknisi IT", "Teknisi Laboratorium", "Teknisi Otomotif"],
  },
  {
    riasec: "I",
    category: "Ilmiah & Riset",
    role: "Ilmuwan",
    examples: ["Ahli Biologi", "Ahli Kimia", "Ahli Fisika", "Data Scientist"],
  },
  {
    riasec: "I",
    category: "Ilmiah & Riset",
    role: "Peneliti",
    examples: ["Peneliti Medis", "Ilmuwan Lingkungan", "Psikolog"],
  },
  {
    riasec: "A",
    category: "Industri Kreatif",
    role: "Desainer",
    examples: [
      "Desainer UI/UX",
      "Desainer Grafis",
      "Desainer Interior",
      "Desainer Busana",
    ],
  },
  {
    riasec: "A",
    category: "Industri Kreatif",
    role: "Seniman",
    examples: ["Ilustrator", "Fotografer", "Musisi", "Penulis"],
  },
  {
    riasec: "S",
    category: "Sosial & Kesehatan",
    role: "Tenaga Kesehatan",
    examples: ["Perawat", "Dokter", "Terapis", "Konselor"],
  },
  {
    riasec: "S",
    category: "Sosial & Pendidikan",
    role: "Pendidik",
    examples: ["Guru", "Dosen", "Trainer", "Pekerja Sosial"],
  },
  {
    riasec: "E",
    category: "Bisnis & Kepemimpinan",
    role: "Manajer",
    examples: [
      "Manajer Bisnis",
      "Manajer Pemasaran",
      "Manajer Penjualan",
      "Wirausaha",
    ],
  },
  {
    riasec: "E",
    category: "Bisnis & Kepemimpinan",
    role: "Eksekutif",
    examples: [
      "Direktur Utama (CEO)",
      "Direktur",
      "Manajer Proyek",
      "Pemimpin Tim",
    ],
  },
  {
    riasec: "C",
    category: "Administratif & Berorientasi Detail",
    role: "Administrator",
    examples: ["Manajer Kantor", "Asisten Eksekutif", "Spesialis SDM"],
  },
  {
    riasec: "C",
    category: "Administratif & Keuangan",
    role: "Profesional Keuangan",
    examples: ["Akuntan", "Auditor", "Analis Keuangan", "Teller Bank"],
  },
];

// RIASEC Analysis Service
const analyzeRIASEC = (bigFive) => {
  const riasec = {
    R: 0, // Realistic
    I: 0, // Investigative
    A: 0, // Artistic
    S: 0, // Social
    E: 0, // Enterprising
    C: 0, // Conventional
  };

  // Map Big Five to RIASEC
  riasec.A += bigFive.openness * 0.5;
  riasec.I += bigFive.openness * 0.5;

  riasec.C += bigFive.conscientiousness * 0.6;
  riasec.I += bigFive.conscientiousness * 0.4;

  riasec.S += bigFive.extraversion * 0.5;
  riasec.E += bigFive.extraversion * 0.5;

  riasec.S += bigFive.agreeableness * 0.7;

  // Lower neuroticism is better
  if (bigFive.neuroticism < 50) {
    const bonus = 50 - bigFive.neuroticism;
    riasec.R += bonus;
    riasec.E += bonus;
  }

  // Sort and get top 3
  const sorted = Object.entries(riasec)
    .sort((a, b) => b[1] - a[1])
    .map(([code, score]) => ({ code, score: Math.round(score) }));

  const top3 = sorted.slice(0, 3).map((item) => item.code);

  return {
    scores: sorted,
    dominantCodes: top3,
    hollandCode: top3.join("-"),
  };
};

// Get career recommendations
const getCareerRecommendations = (dominantCodes) => {
  return careerData.filter((career) => dominantCodes.includes(career.riasec));
};

// Components
const StepIndicator = ({ currentStep }) => {
  return (
    <div className="flex items-center justify-center mb-8">
      <div className="flex items-center space-x-4">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep === 1
              ? "bg-indigo-600 text-white"
              : "bg-indigo-100 text-indigo-600"
          } font-semibold transition-all`}
        >
          1
        </div>
        <div
          className={`h-1 w-16 ${
            currentStep === 2 ? "bg-indigo-600" : "bg-gray-300"
          } transition-all`}
        ></div>
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            currentStep === 2
              ? "bg-indigo-600 text-white"
              : "bg-gray-300 text-gray-500"
          } font-semibold transition-all`}
        >
          2
        </div>
      </div>
    </div>
  );
};

const HomePage = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-xl p-12">
          <div className="mb-8">
            <div className="inline-block p-4 bg-indigo-100 rounded-full mb-6">
              <svg
                className="w-16 h-16 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Career Path Finder
            </h1>
            <p className="text-lg text-gray-600 mb-2">
              Temukan arah karier ideal Anda berdasarkan kepribadian Anda
            </p>
            <p className="text-sm text-gray-500">
              Temukan Kepribadian Anda dengan Analisis Big Five & Karier RIASEC
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-800 mb-4 text-center">
              Bagaimana Caranya:
            </h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                  1
                </span>
                <p className="text-gray-600">
                  Melakukan tes kepribadian melalui.
                </p>{" "}
                <a
                  className="text-blue-900 ml-2 underline"
                  href="https://www.ibunda.id/tespsikologi/tes-kepribadian"
                >
                  Link Ini
                </a>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                  2
                </span>
                <p className="text-gray-600">
                  Kembali ke website ini dan menekan tombol Start untuk memulai
                  proses analisis.
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                  3
                </span>
                <p className="text-gray-600">
                  Masukkan skor tes Kepribadian Big Five Anda
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                  4
                </span>
                <p className="text-gray-600">
                  Masukkan Big Five Anda dan Dapatkan profil RIASEC (Kode
                  Holland) Anda
                </p>
              </div>
              <div className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm mr-3 mt-0.5">
                  5
                </span>
                <p className="text-gray-600">
                  Jelajahi rekomendasi karir yang dipersonalisasi
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={onStart}
            className="bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
          >
            Mulai Sekarang
          </button>

          <p className="text-xs text-gray-400 mt-8">
            Designed for high school students exploring career options
          </p>
        </div>
      </div>
    </div>
  );
};

const BigFiveForm = ({ onSubmit }) => {
  const [scores, setScores] = useState({
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
  });

  const traits = [
    {
      key: "openness",
      label: "Openness",
      description: "Rasa ingin tahu, kreativitas, imajinasi",
    },
    {
      key: "conscientiousness",
      label: "Conscientiousness",
      description: "Organisasi,Tanggung Jawab, Disiplin",
    },
    {
      key: "extraversion",
      label: "Extraversion",
      description: "Keterbukaan sosial, antusiasme, ketegasan",
    },
    {
      key: "agreeableness",
      label: "Agreeableness",
      description: "belas kasih, kerja sama, kepercayaan",
    },
    {
      key: "neuroticism",
      label: "Neuroticism",
      description: "Sensitivitas emosional, respons terhadap stres",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(scores);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <StepIndicator currentStep={1} />

        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Masukkan Score Big Five Anda
            </h2>
            <p className="text-gray-600">
              Masukkan Hasil Test Pribadi anda (0-100 scale)
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {traits.map((trait) => (
              <div key={trait.key} className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <label className="text-lg font-semibold text-gray-800">
                      {trait.label}
                    </label>
                    <p className="text-sm text-gray-500">{trait.description}</p>
                  </div>
                  <span className="text-2xl font-bold text-indigo-600 ml-4">
                    {scores[trait.key]}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={scores[trait.key]}
                  onChange={(e) =>
                    setScores({
                      ...scores,
                      [trait.key]: parseInt(e.target.value),
                    })
                  }
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>Low (0)</span>
                  <span>High (100)</span>
                </div>
              </div>
            ))}

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl"
              >
                Analisis Profil Career Saya
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const ResultsPage = ({ bigFiveScores, onReset }) => {
  const analysis = analyzeRIASEC(bigFiveScores);
  const careers = getCareerRecommendations(analysis.dominantCodes);

  const riasecNames = {
    R: "Realistic",
    I: "Investigative",
    A: "Artistic",
    S: "Social",
    E: "Enterprising",
    C: "Conventional",
  };

  const riasecColors = {
    R: "#10b981",
    I: "#3b82f6",
    A: "#8b5cf6",
    S: "#ec4899",
    E: "#f59e0b",
    C: "#06b6d4",
  };

  const chartData = analysis.scores.map((item) => ({
    name: riasecNames[item.code],
    score: item.score,
    code: item.code,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <StepIndicator currentStep={2} />

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-3">
            Profile Career Kamu
          </h2>
          <p className="text-xl text-gray-600">
            Holland Code:{" "}
            <span className="font-bold text-indigo-600">
              {analysis.hollandCode}
            </span>
          </p>
        </div>

        {/* RIASEC Chart */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Profil Kepribadian RIASEC Anda
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
              <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "none",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                }}
              />
              <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={riasecColors[entry.code]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-8">
            {analysis.scores.map((item, index) => (
              <div
                key={item.code}
                className={`p-4 rounded-xl ${
                  index < 3
                    ? "bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-gray-800">{item.code}</span>
                  <span
                    className="text-2xl font-bold"
                    style={{ color: riasecColors[item.code] }}
                  >
                    {item.score}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {riasecNames[item.code]}
                </p>
                {index < 3 && (
                  <div className="mt-2">
                    <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                      Dominant
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Career Recommendations */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Recomendasi Bidang Karir
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {careers.map((career, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="inline-block px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm font-semibold mb-2">
                      {career.riasec} Type
                    </div>
                    <h4 className="text-xl font-bold text-gray-800">
                      {career.role}
                    </h4>
                    <p className="text-sm text-gray-500">{career.category}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Contoh:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {career.examples.map((example, idx) => (
                      <span
                        key={idx}
                        className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-50 border-l-4 border-amber-400 rounded-xl p-6 mb-8">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-amber-600 mr-3 flex-shrink-0"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <div>
              <h4 className="font-semibold text-amber-900 mb-1">
                Disclaimer Penting
              </h4>
              <p className="text-sm text-amber-800">
                RIASEC Anda Hasil ini merupakan rekomendasi karier awal
                berdasarkan analisis kepribadian dan tidak menggantikan
                konseling karier profesional. Untuk panduan yang lebih lengkap,
                silakan berkonsultasi dengan konselor karier atau penasihat
                akademik yang berkualifikasi.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <button
            onClick={onReset}
            className="bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-full font-semibold hover:bg-indigo-50 transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function CareerRecommendationApp() {
  const [currentPage, setCurrentPage] = useState("home");
  const [bigFiveScores, setBigFiveScores] = useState(null);

  const handleStart = () => {
    setCurrentPage("form");
  };

  const handleFormSubmit = (scores) => {
    setBigFiveScores(scores);
    setCurrentPage("results");
  };

  const handleReset = () => {
    setBigFiveScores(null);
    setCurrentPage("home");
  };

  return (
    <div>
      {currentPage === "home" && <HomePage onStart={handleStart} />}
      {currentPage === "form" && <BigFiveForm onSubmit={handleFormSubmit} />}
      {currentPage === "results" && (
        <ResultsPage bigFiveScores={bigFiveScores} onReset={handleReset} />
      )}
    </div>
  );
}
