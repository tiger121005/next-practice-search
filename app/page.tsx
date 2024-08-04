'use client'

import Image from "next/image";
import ItemList from "./components/itemList";
import { ProgramData } from "./types/programData";
import prisma from "@/lib/prismaClient";
import React, { useState, useEffect } from 'react';
import { searchProgram } from "./api/search/route";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { searchFormSchema } from "./action/formSchema";
import '@mantine/core/styles.css';
import { ComboboxItem, ComboboxParsedItem, createTheme, MantineProvider, MultiSelect, OptionsFilter } from "@mantine/core";

interface ProgramDataProps {
  allData: ProgramData[]
}

export default function Home() {

  var [ programData, setData ] = useState<ProgramData[]>([]);
  const [keyword, setKeyword] = useState("");
  const [places, setPlaces] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await getAllProgramData();
      setData(data);
    }
    getData();
  }, []);

  const form = useForm({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      keyword: ''
    }
  })

  const onSearch = async () => {
    programData = await searchProgram({ keyword, places, categories })
    setData(programData)
  }

  const onClear = async () => {
    setKeyword('')
    setPlaces([])
    setCategories([])
    const data: ProgramData[] = await getAllProgramData();
    setData(data)

  }

  const theme = createTheme({
    /** Put your mantine theme override here */
  });

  return (
    <MantineProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="text-4xl text-black">検索</div>
        <div className="flex">
          <div>
            <p>キーワード</p>
            <input type="text" value={keyword} onChange={(event) => setKeyword(event.target.value)} className="text-black" />
          </div>
          <div className="px-4">
            <MultiSelect
            label="場所"
              placeholder='場所を選んでください'
            data={[
              'LS（ラーニングスクエア）', 'メディア棟', '第一校舎', '野外ステージ', '屋台'
            ]}
            value={places}
            onChange={setPlaces}
              comboboxProps={{ shadow: 'md' }}
            clearable
            />
          </div>
          <div className="px-4">
            <MultiSelect
              label="カテゴリー"
              placeholder='カテゴリーを選んでください'
              checkIconPosition="right"
              data={[
                '飲食', 'ショー', '展示'
              ]}
              value={categories}
              onChange={setCategories}
              comboboxProps={{shadow: 'md'}}
              clearable
            />
          </div>
          <button className="bg-blue-500 px-4" onClick={onSearch}>検索</button>
          <button className="bg-red-500 px-4" onClick={onClear}>Clear</button>
        </div>
        <ItemList programAllData={programData} />
      </main>
    </MantineProvider>
    
  );
}

async function getAllProgramData() {
  const response = await fetch('http://localhost:3000/api/post', {
    cache: 'no-store'
  });
  // const data: ProgramData[] = await prisma.program.findMany();
  const programAllData: ProgramData[] = await response.json();
  console.log(programAllData)
  return programAllData
}