import Image from "next/image";
import ItemList from "./components/itemList";

export default async function Home() {

  var keyword: string = ''
  var places: string[] = []
  var category: string[] = []
  var programData = await getProgramAllData(keyword, places, category);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-4xl text-white">検索</div>
      <div className="flex">
        <input className="text-black w-1/2" type={keyword} />
        <div className="px-4">
          
        </div>
        <div className="px-4">
          <div>カテゴリー</div>
        </div>
        <div className="bg.blue">検索</div>
      </div>
      <ItemList programAllData={programData} />
    </main>
  );
}

async function getProgramAllData(keyword: string, place: string[], category: string[]) {
  const response = await fetch("http://localhost:3000/api/post", {
    cache: "no-store",
  });

  const programAllData = await response.json();

  console.log(programAllData)
  return programAllData;
}