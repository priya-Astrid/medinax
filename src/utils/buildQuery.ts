export const buildQuery = (query: any, searchField: string[] =[]) => {
  const filter: any = {};
  const options: any = {};

  // search 

  if(query.search && searchField.length>0){
  
    const term = query.search.split(" ").filter(Boolean);
     filter.$and = term.map((term: string)=>({
      // [field]:{$regex : query.search, $options:'i'}
    $or: searchField.map((field)=>({
      [field] : {$regex: term, $options:"i"}
    }))
    }));
  }
  // pagination

  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 10;
  options.limit = limit;
  options.skip = (page - 1) * limit;
  //   sorting

  if (query.sortBy) {
    options.sort = {
      [query.sortBy]: query.sortOrder === 'desc' ? -1 : 1,
    };
  }

  //Date Range
  if (query.startDate || query.endDate) {
    filter.visitDate = {};
    if (query.startDate) filter.visitDate.$gte = new Date(query.startDate);
    if (query.endDate) filter.visitDate.$lte = new Date(query.endDate);
  }
  return { filter, options };
};

// export const buildQuery = (query: any) => {
//   const filter: any = {};
//   const options: any = {};

//   // pagination

//   const page = parseInt(query.page) || 1;
//   const limit = parseInt(query.limit) || 10;
//   options.limit = limit;
//   options.skip = (page - 1) * limit;
//   //   sorting

//   if (query.sortBy) {
//     options.sort = {
//       [query.sortBy]: query.sortOrder === 'desc' ? -1 : 1,
//     };
//   }

//   //Date Range
//   if (query.startDate || query.endDate) {
//     filter.visitDate = {};
//     if (query.startDate) filter.visitDate.$gte = new Date(query.startDate);
//     if (query.endDate) filter.visitDate.$lte = new Date(query.endDate);
//   }
//   return { filter, options};
// };
