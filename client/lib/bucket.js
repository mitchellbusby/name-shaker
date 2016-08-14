let bucket = (sigmaDelta) => {
  if (sigmaDelta > 500) {
    return 4;
  }
  if (sigmaDelta > 300) {
    return 3;
  }
  if (sigmaDelta > 100) {
    return 2;
  }
  return 1;
}

let bucket_qualitative = (sigmaDeltaBucketed) => {
    if (sigmaDeltaBucketed === 4) {
        return "Rare";
    }
    if (sigmaDeltaBucketed === 3) {
        return "Unusual";
    }
    if (sigmaDeltaBucketed === 2) {
        return "Common";
    }
    if (sigmaDeltaBucketed === 1) {
        return "Very common";
    }
}

let bucket_name = (sigmaDeltaBucketed) => {
    if (sigmaDeltaBucketed === 4) {
        return "weird";
    }
    if (sigmaDeltaBucketed === 3) {
        return "odd";
    }
    if (sigmaDeltaBucketed === 2) {
        return "common";
    }
    if (sigmaDeltaBucketed === 1) {
        return "vcommon";
    }
}

module.exports = {
  bucket: bucket,
  bucket_qualitative: bucket_qualitative,
  bucket_name: bucket_name
};
