import { Resource } from 'sst';
import { scanTable } from './scanTable';
import MyForm from './form';

export default async function Home() {
    const response = await scanTable(Resource.MyTable.name);
    if (response.Items) {
        for (const item of response.Items) {
            console.log(item);
        }
    }
    return <MyForm formName={Resource.MyTable.name} />;
}
