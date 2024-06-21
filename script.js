$(document).ready(function () {
  class Registrant {
    static counter = 1;
    constructor(name, age, pocketMoney) {
      this.no = Registrant.counter++;
      this.name = name;
      this.age = age;
      this.pocketMoney = pocketMoney;
    }
  }

  class RegistrantList {
    constructor() {
      this.list = [];
    }

    addRegistrant(name, age, pocketMoney) {
      const registrant = new Registrant(name, age, pocketMoney);
      this.list.push(registrant);
    }

    displayList() {
      const tabelPendaftar = $("#tabelPendaftar");
      tabelPendaftar.empty(); // Clear existing rows

      this.list.forEach((regist) => {
        let formattedPocketMoney = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(regist.pocketMoney);

        tabelPendaftar.append(`
                    <tr>
                        <td>${regist.no}</td>
                        <td>${regist.name}</td>
                        <td>${regist.age}</td>
                        <td>${formattedPocketMoney}</td>
                    </tr>
                `);
      });
    }

    updateStatistics() {
      const totalRegistrants = this.list.length;
      if (totalRegistrants === 0) {
        $(".usia").text("");
        $(".uangsangu").text("");
        return;
      }

      const totalAge = this.list.reduce((sum, regist) => sum + regist.age, 0);
      const averageAge = totalAge / totalRegistrants;

      const totalPocketMoney = this.list.reduce(
        (sum, regist) => sum + regist.pocketMoney,
        0
      );
      const averagePocketMoney = totalPocketMoney / totalRegistrants;
      let formattedAveragepockatmoney = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
      }).format(averagePocketMoney);

      $(".usia").text(averageAge.toFixed(2)); // Display average age
      $(".uangsangu").text(`${formattedAveragepockatmoney}`); // Display average pocket money
    }
  }

  const registRegistant = new RegistrantList();

  $("#formRegistrasi").submit(function (event) {
    event.preventDefault();

    const name = $("#nama").val();
    const age = parseInt($("#umur").val());
    const pocketMoney = parseInt($("#uang").val());

    registRegistant.addRegistrant(name, age, pocketMoney);

    $("#nama").val("");
    $("#umur").val("");
    $("#uang").val("");

    registRegistant.displayList();

    registRegistant.updateStatistics();
  });

  registRegistant.displayList();
  registRegistant.updateStatistics();
});
