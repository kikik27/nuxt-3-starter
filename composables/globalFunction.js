function dataURItoBlob(dataURI) {
  if (!dataURI) return;
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  const blob = new Blob([ab], { type: mimeString });
  return blob;
}

function nextYears() {
  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  console.log(
    `${nextYear.getFullYear()}/${nextYear.getMonth()}/${nextYear.getDate()}`
  );
  return `${nextYear.getFullYear()}-${nextYear.getMonth()}-${nextYear.getDate()}`;
}

function timeAgo(createdAt) {
  const currentDate = new Date();
  const createdDate = new Date(createdAt);

  const timeDifference = currentDate - createdDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    return `${weeks} minggu yang lalu`;
  } else if (days > 0) {
    return `${days} hari yang lalu`;
  } else if (hours > 0) {
    return `${hours} jam yang lalu`;
  } else if (minutes > 0) {
    return `${minutes} menit yang lalu`;
  } else {
    return `${seconds} detik yang lalu`;
  }
}

function today(value = null) {
  const today = value ? new Date(value) : new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

function tomorrow(value = null) {
  const today = value ? new Date(value) : new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const year = tomorrow.getFullYear();
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const day = String(tomorrow.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
function getFullYear(value = null) {
  const today = value ? new Date(value) : new Date();
  const year = today.getFullYear();
  return year;
}

function formatIndoDate(value = null) {
  const date = value ? new Date(value) : new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

function formatIndoDateWithClock(value = null) {
  const date = value ? new Date(value) : new Date();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  const second = String(date.getSeconds()).padStart(2, "0");
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}
function formatIndoDateV2(value = null) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = value ? new Date(value) : new Date();
  const month = date.getMonth();
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${months[month]}`;
}

function formatTanggalWaktu(inputDate) {
  var date = new Date(inputDate);

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  var formattedDate =
    (day < 10 ? "0" : "") +
    day +
    "/" +
    (month < 10 ? "0" : "") +
    month +
    "/" +
    year;

  var hours = date.getHours();
  var minutes = date.getMinutes();

  var formattedTime =
    (hours < 10 ? "0" : "") + hours + "." + (minutes < 10 ? "0" : "") + minutes;

  var formattedDateTime = formattedDate + " - " + formattedTime;

  return formattedDateTime;
}

function getClasses() {
  const classes = reactive([]);

  const levels = ["X", "XI", "XII"];
  const streams = ["RPL", "TKJ"];

  for (let level of levels) {
    for (let i = 1; i <= 8; i++) {
      classes.push(`${level} ${streams[0]} ${i}`);
    }
    for (let i = 1; i <= 6; i++) {
      classes.push(`${level} ${streams[1]} ${i}`);
    }
  }

  return classes;
}

function formatHoursMinutes(value = null) {
  const date = value ? new Date(value) : new Date();
  const hour = String(date.getHours()).padStart(2, "0");
  const minute = String(date.getMinutes()).padStart(2, "0");
  return `${hour}:${minute}`;
}

function getHoursAndMinutes() {
  const now = new Date();
  const today = now.getDate();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  if (now.getDate() === today) {
    return {
      hours: currentHour,
      minutes: currentMinutes,
    };
  } else {
    return {
      hours: 7,
      minutes: 0,
    };
  }
}

export {
  getClasses,
  dataURItoBlob,
  nextYears,
  today,
  tomorrow,
  getFullYear,
  formatIndoDate,
  formatIndoDateWithClock,
  formatIndoDateV2,
  timeAgo,
  formatTanggalWaktu,
  getHoursAndMinutes,
  formatHoursMinutes
};
