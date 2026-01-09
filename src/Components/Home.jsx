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
import logo from "../assets/UTY.png";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

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
    <div className="min-h-screen bg-[#f8fafc] relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100/50 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-100/50 rounded-full blur-[120px]"></div>

      <div className="max-w-5xl w-full z-10">
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-8 md:p-16">
          <div className=" flex justify-center md:mb-0 mb-10  items-center">
            <img src={logo} className="w-20 rounded-full shadow-" />
          </div>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Sisi Kiri: Konten Utama */}
            <div className="text-left md:order-0 order-2">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full mb-8">
                <span className="flex h-2 w-2 rounded-full bg-indigo-600 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-600">
                  Career Intelligence v2.0
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Rancang{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">
                  Masa Depan
                </span>{" "}
                Anda.
              </h1>

              <p className="text-slate-500 text-lg mb-10 leading-relaxed max-w-md">
                Gunakan kekuatan psikometri{" "}
                <span className="text-slate-800 font-medium">Big Five</span> &{" "}
                <span className="text-slate-800 font-medium">RIASEC</span> untuk
                menemukan karier yang selaras dengan jati diri Anda.
              </p>

              <button
                onClick={onStart}
                className="group relative inline-flex items-center justify-center px-10 py-4 font-bold text-white bg-indigo-600 rounded-2xl transition-all duration-300 hover:bg-indigo-700 hover:shadow-[0_10px_25px_rgba(79,70,229,0.3)] active:scale-95"
              >
                Mulai Analisis
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </button>
            </div>

            {/* Sisi Kanan: Panduan Alur */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-50 to-purple-50 rounded-[2.5rem] -rotate-2"></div>
              <div className="relative bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-sm">
                <h3 className="text-slate-900 font-bold mb-8 flex items-center">
                  <span className="w-8 h-1 bg-indigo-600 mr-3 rounded-full"></span>
                  Langkah Persiapan
                </h3>

                <div className="space-y-8">
                  {[
                    {
                      title: "Tes Psikologi",
                      desc: "Ikuti tes Big Five Personality di",
                      link: "ibunda.id",
                      url: "https://www.ibunda.id/tespsikologi/tes-kepribadian",
                    },
                    {
                      title: "Input Skor",
                      desc: "Masukkan hasil skor Anda ke sistem kami.",
                      link: null,
                    },
                    {
                      title: "Hasil RIASEC",
                      desc: "Dapatkan profil Holland Code secara instan.",
                      link: null,
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="flex group">
                      <div className="mr-4">
                        <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all font-bold text-xs border border-slate-100">
                          {idx + 1}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-800">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {item.desc}
                          {item.link && (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noreferrer"
                              className="text-indigo-600 font-semibold underline ml-1 hover:text-indigo-800"
                            >
                              {item.link}
                            </a>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Developer Footer Section */}
          <div className="mt-20 pt-8 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
                <span className="text-white font-black text-xl">JD</span>
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                  Developed By
                </p>
                <h4 className="text-sm font-bold text-slate-800">
                  Dina Ayu Astuti
                </h4>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
              <a
                href="mailto:emailkamu@gmail.com"
                className="flex items-center text-slate-400 hover:text-indigo-600 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center mr-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold">
                  dinaayuastuti22@gmail.com
                </span>
              </a>
              <div className="h-4 w-[1px] bg-slate-200 hidden md:block"></div>
              <p className="text-[10px] font-medium text-slate-400 italic">
                Bimbingan dan Konseling
              </p>
              <p className="text-[10px] font-medium text-slate-400 italic">
                Universitas Teknologi Yogyakarta
              </p>
            </div>
          </div>
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

  const downloadPDF = async () => {
    const input = document.getElementById("results-content");
    const actionButtons = document.getElementById("action-buttons");

    if (actionButtons) actionButtons.style.display = "none";

    try {
      // Memberi waktu transisi DOM
      await new Promise((resolve) => setTimeout(resolve, 300));

      // Ambil ukuran asli elemen termasuk bagian yang harus di-scroll
      const canvas = await html2canvas(input, {
        scale: 2, // Kualitas tinggi
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        // PAKSA html2canvas mengambil seluruh tinggi elemen
        height: input.scrollHeight,
        windowHeight: input.scrollHeight,
        onclone: (clonedDoc) => {
          const content = clonedDoc.getElementById("results-content");

          content.style.height = "auto";
          content.style.overflow = "visible";
          content.style.backgroundColor = "#ffffff";
          content.style.color = "#1f2937";

          const elements = content.querySelectorAll("*");

          elements.forEach((el) => {
            const style = clonedDoc.defaultView.getComputedStyle(el);

            if (style.backgroundColor.includes("oklch")) {
              el.style.backgroundColor = "#ffffff";
            }

            if (style.color.includes("oklch")) {
              el.style.color = "#1f2937";
            }

            if (style.borderColor?.includes("oklch")) {
              el.style.borderColor = "#e5e7eb";
            }

            // Matikan filter / backdrop blur (sering bawa oklch)
            el.style.backdropFilter = "none";
            el.style.filter = "none";
          });
        },
        ignoreElements: (element) => element.classList.contains("no-print"),
      });

      const imgData = canvas.toDataURL("image/png");

      // Inisialisasi jsPDF
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Hitung rasio gambar agar pas dengan lebar A4
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Jika hasil konten lebih panjang dari satu halaman A4:
      let heightLeft = imgHeight;
      let position = 0;

      // Tambah halaman pertama
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Tambah halaman baru jika konten masih ada (Auto-pagination)
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save(`Hasil_RIASEC_${analysis.hollandCode}.pdf`);
    } catch (error) {
      console.error("Gagal mendownload PDF:", error);
      alert("Terjadi kendala saat menyusun halaman PDF.");
    } finally {
      if (actionButtons) actionButtons.style.display = "flex";
    }
  };

  const riasecNames = {
    R: "Realistis (Praktis & Teknis)",
    I: "Investigatif (Analitis & Ilmiah)",
    A: "Artistik (Kreatif & Ekspresif)",
    S: "Sosial (Membantu & Mengajar)",
    E: "Enterprising (Memimpin & Berwirausaha)",
    C: "Konvensional (Administratif & Terstruktur)",
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
    name: item.code, // Pakai kode pendek agar chart tidak berantakan di PDF
    fullName: riasecNames[item.code],
    score: item.score,
    code: item.code,
  }));

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div
        id="results-content"
        className="max-w-4xl mx-auto p-8 bg-white"
        style={{
          backgroundColor: "#ffffff",
          color: "#1f2937",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <StepIndicator currentStep={2} />

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2">Profil Karir RIASEC</h2>
          <p className="text-lg">
            Holland Code:{" "}
            <span className="text-indigo-600 font-bold">
              {analysis.hollandCode}
            </span>
          </p>
        </div>

        {/* Chart dengan animasi dimatikan agar tertangkap sempurna di PDF */}
        <div className="mb-10 p-4 border border-gray-100 rounded-xl no-print">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f0f0f0"
              />
              <XAxis dataKey="name" tick={{ fill: "#374151" }} />
              <YAxis tick={{ fill: "#374151" }} />
              <Tooltip />
              <Bar dataKey="score" isAnimationActive={false}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={riasecColors[entry.code]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {analysis.scores.map((item) => (
            <div
              key={item.code}
              className="p-4 border border-gray-200 rounded-lg"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold">{item.code}</span>
                <span
                  className="font-bold"
                  style={{ color: riasecColors[item.code] }}
                >
                  {item.score}
                </span>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                {riasecNames[item.code]}
              </p>
            </div>
          ))}
        </div>

        <div className="space-y-4 mb-10">
          <h3 className="text-xl font-bold border-b pb-2 text-gray-800">
            Rekomendasi Karir
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {careers.map((career, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-100"
              >
                <span className="text-[10px] font-bold text-indigo-600 uppercase">
                  {riasecNames[career.riasec]}
                </span>
                <h4 className="font-bold text-gray-800">{career.role}</h4>
                <p className="text-xs text-gray-600 mt-1">
                  {career.examples.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          id="action-buttons"
          className="flex flex-col md:flex-row justify-center gap-4 no-print"
        >
          <button
            onClick={downloadPDF}
            className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg"
          >
            Download PDF
          </button>
          <button
            onClick={onReset}
            className="bg-gray-100 text-gray-600 px-8 py-3 rounded-xl font-bold hover:bg-gray-200"
          >
            Tes Ulang
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
