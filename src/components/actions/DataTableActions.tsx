/* eslint-disable @typescript-eslint/no-explicit-any */


export async function createData(item: any, url: string) {
    console.log('Create', item, url);
}

export async function selectedData(selected: any[], url: string) {
    console.log('Selected', selected, url);
}

export async function viewData(item: any, url: string) {
    console.log('View', item, url);
    // alert(`View: ${item.name } - ${ url}`);
}

export async function editData(item: any, url: string) {
    console.log('Edit', item, url);
}

export async function deleteData(item: any, url: string) {
    console.log('Delete', item, url);
}
export async function exportData(selected: any[], url: string) {
    console.log('Export', selected, url);
}

export async function printData(selected: any, url: string) {
    console.log('Print', selected, url);
}
export async function archiveData(selected: any[], url: string) {
    console.log('Archive', selected, url);
}

export async function unarchiveData(selected: any[], url: string) {
    console.log('Unarchive', selected, url);
}

export async function shareData(selected: any[], url: string) {
    console.log('Share', selected, url);
}
export async function copyData(selected: any[], url: string) {
    console.log('Copy', selected, url);
}
export async function duplicateData(selected: any[], url: string) {
    console.log('Duplicate', selected, url);
}