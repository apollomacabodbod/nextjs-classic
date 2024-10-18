"use server"


 type Welcome = {
    utc_offset?:   string;
    timezone?:     string;
    day_of_week?:  number;
    day_of_year?:  number;
    datetime?:     Date;
    utc_datetime?: Date;
    unixtime?:     number;
    raw_offset?:   number;
    week_number?:  number;
    dst?:          boolean;
    abbreviation?: string;
    dst_offset?:   number;
    dst_from?:     Date;
    dst_until?:    Date;
    client_ip?:    string;
}

export default async function getData(): Promise<Welcome> {
  const res = await fetch('https://worldtimeapi.org/api/timezone/America/Vancouver', { cache: 'no-store' })
  const data = res.json()
  console.log("test..")
  return data;


}

