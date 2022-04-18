<!DOCTYPE html>
<html lang="en">


<%- include ("./templateheader.ejs") %>


  <!--Main layout-->
  <main style="margin-top: 58px">
    <div class="container pt-4">

      <!--Section: Sales Performance KPIs-->
      <section class="mb-4">
        <div class="card">
          <div class="card-header text-center py-3">
            <h5 class="mb-0 text-center">
              <strong>Customer Accounts</strong>
            </h5>
          </div>
          <div class="card-body">
            <div class="table-responsive">
		<div class="customerAccounts"></div>
            </div>
          </div>
        </div>
      </section>
      <!--Section: Sales Performance KPIs-->
        <div class="card">
          <div class="card-header text-center py-3">
            <h5 class="mb-0 text-center">
              <strong>Create/Modify Account</strong>
            </h5>
          </div>
          <div class="card-body">
            <div class="d-flex justify-content-center">
          <form action="/admin/api/createAccount" method="POST">
	    <div class="form-outline mb-4">
	        <div class="d-flex justify-content-center">
		<input type="label" id="accountId" name="accountId" class="form-control active" readonly><br/>
		<label class="form-label" for="accountId" style="margin-left: 0px;">RecordID</label>
		</div>

		<div class="form-outline mb-4">
			<input type="text" id="accountName" name="accountName" class="form-control" autocomplete="off">
            		<label class="form-label" for="accountName" style="margin-left: 0px;">Account Name</label>
		</div>

  <div class="row mb-4">
    <div class="col d-flex justify-content-center">
      <!-- Checkbox -->
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
        <label class="form-check-label" for="form1Example3"> Remember me </label>
      </div>
    </div>

    <div class="col">
      <!-- Simple link -->
      <a href="#!">Forgot password?</a>
    </div>
  </div>

			<button type="submit" class="btn btn-primary btn-block mb-4" id="customerAccountButton">Create Account</button>
		</form>
            </div>
          </div>
        </div>
      </section>


  </main>
  <!--Main layout-->
  <!-- MDB -->
  <script type="text/javascript" src="/admin/resources/js/mdb.min.js"></script>
  <!-- Custom scripts
  <script type="text/javascript" src="/admin/resources/js/admin.js"></script> -->
  <script type="text/javascript" src="/admin/resources/js/customertable.js"></script>

</body>

</html>
