import type { Route } from "./+types/save-result";
import { Form, redirect, useLoaderData } from "react-router";
import { db } from "../db.server";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "診断結果を保存" },
    { name: "description", content: "診断結果をデータベースに保存します" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const name = url.searchParams.get("name") || "";
  const birthdate = url.searchParams.get("birthdate") || "";
  const lifePathNumber = parseInt(url.searchParams.get("lifePathNumber") || "0", 10);
  const aspiration_q1 = url.searchParams.get("aspiration_q1") || "";
  const aspiration_q2 = url.searchParams.get("aspiration_q2") || "";
  const aspiration_q3 = url.searchParams.get("aspiration_q3") || "";

  return {
    name,
    birthdate,
    lifePathNumber,
    aspiration_q1,
    aspiration_q2,
    aspiration_q3,
  };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get("name") as string;
  const birthdate = formData.get("birthdate") as string;
  const lifePathNumber = parseInt(formData.get("lifePathNumber") as string, 10);
  const aspiration_q1 = formData.get("aspiration_q1") as string;
  const aspiration_q2 = formData.get("aspiration_q2") as string;
  const aspiration_q3 = formData.get("aspiration_q3") as string;

  await db.fortuneResult.create({
    data: {
      userName: name,
      birthdate,
      lifePathNumber,
      aspirationQ1: aspiration_q1,
      aspirationQ2: aspiration_q2,
      aspirationQ3: aspiration_q3,
    },
  });

  return redirect("/history");
}

export default function SaveResult() {
  const { name, birthdate, lifePathNumber, aspiration_q1, aspiration_q2, aspiration_q3 } =
    useLoaderData<typeof loader>();

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">診断結果の確認</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">保存する内容</h2>
        
        <dl className="space-y-3">
          <div>
            <dt className="font-medium text-gray-700">お名前</dt>
            <dd className="text-gray-900">{name || "未入力"}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-700">生年月日</dt>
            <dd className="text-gray-900">{birthdate || "未入力"}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-700">ライフパスナンバー</dt>
            <dd className="text-gray-900">{lifePathNumber || "未入力"}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-700">願望数1</dt>
            <dd className="text-gray-900">{aspiration_q1 || "未入力"}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-700">願望数2</dt>
            <dd className="text-gray-900">{aspiration_q2 || "未入力"}</dd>
          </div>
          
          <div>
            <dt className="font-medium text-gray-700">願望数3</dt>
            <dd className="text-gray-900">{aspiration_q3 || "未入力"}</dd>
          </div>
        </dl>
      </div>

      <Form method="post" className="space-y-4">
        <input type="hidden" name="name" value={name} />
        <input type="hidden" name="birthdate" value={birthdate} />
        <input type="hidden" name="lifePathNumber" value={lifePathNumber} />
        <input type="hidden" name="aspiration_q1" value={aspiration_q1} />
        <input type="hidden" name="aspiration_q2" value={aspiration_q2} />
        <input type="hidden" name="aspiration_q3" value={aspiration_q3} />
        
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          この内容でデータベースに保存する
        </button>
      </Form>
    </div>
  );
}
